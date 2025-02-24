import torch
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import numpy as np
import os
from collections import OrderedDict
from transformers import AutoTokenizer, AutoModelForSequenceClassification, DistilBertForSequenceClassification, AutoModelForSeq2SeqLM
from torchvision.transforms import v2
from torchvision import transforms
from PIL import Image
from Model.models.t2t_vit import T2t_vit_14





# Define the multimodal structure
class Multimodal(torch.nn.Module):
    def __init__(self, model1, model2, model3):
        super().__init__()
        self.model1 = model1
        self.model2 = model2
        self.model3 = model3
        self.fc1 = torch.nn.Linear(18, 18)
        self.fc2 = torch.nn.Linear(18, 18)
        self.fc3 = torch.nn.Linear(12, 18)

    def forward(self, 
                title_input_ids, title_attention_mask,
                plot_input_ids, plot_attention_mask,
                image_input):
        title_output = self.model1(title_input_ids, title_attention_mask)
        plot_output = self.model2(plot_input_ids, plot_attention_mask)
        image_output = self.model3(image_input)

        title_output = self.fc1(title_output.logits)
        plot_output = self.fc2(plot_output.logits)
        image_output = self.fc3(image_output)
        
        output = torch.add(title_output, plot_output)
        output = torch.add(output, image_output)
        return output

def load_state_dict(checkpoint_path, use_ema=False, num_classes=1000):
    if checkpoint_path and os.path.isfile(checkpoint_path):
        checkpoint = torch.load(checkpoint_path, map_location='cpu')
        state_dict_key = 'state_dict'
        if isinstance(checkpoint, dict):
            if use_ema and 'state_dict_ema' in checkpoint:
                state_dict_key = 'state_dict_ema'
        if state_dict_key and state_dict_key in checkpoint:
            new_state_dict = OrderedDict()
            for k, v in checkpoint[state_dict_key].items():
                # strip `module.` prefix
                name = k[7:] if k.startswith('module') else k
                new_state_dict[name] = v
            state_dict = new_state_dict
        else:
            state_dict = checkpoint
        return state_dict
    else:
        raise FileNotFoundError()

def load_for_transfer_learning(model, checkpoint_path, use_ema=False, strict=False, num_classes=1000):
    state_dict = load_state_dict(checkpoint_path, use_ema, num_classes)
    model.load_state_dict(state_dict, strict=strict)

# Define the genres
genres = ["Crime", "Thriller", "Fantasy", "Horror", "Sci-Fi", "Comedy", "Documentary", "Adventure", "Film-Noir", "Animation", "Romance", "Drama", "Western", "Musical", "Action", "Mystery", "War", "Children\'s"]
mapping = {}
for i in range(len(genres)):
    mapping[i] = genres[i]
mapping

# Load the tokenizers and models
tokenizer_gen = AutoTokenizer.from_pretrained("MBZUAI/LaMini-Flan-T5-248M")
model_gen = AutoModelForSeq2SeqLM.from_pretrained("MBZUAI/LaMini-Flan-T5-248M")

tokenizer1 = AutoTokenizer.from_pretrained("distilbert-base-uncased")
model1 = DistilBertForSequenceClassification .from_pretrained("distilbert-base-uncased", problem_type="multi_label_classification", num_labels=18)
model1.config.id2label = mapping

tokenizer2 = AutoTokenizer.from_pretrained("dduy193/plot-classification")
model2 = AutoModelForSequenceClassification.from_pretrained("dduy193/plot-classification")
model2.config.id2label = mapping

model3 = T2t_vit_14(img_size=224, num_classes=12)
model3.fc = torch.nn.Linear(2048, len(genres))

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model1.to(device)
model2.to(device)
model3.to(device)
device

# Initialize the multimodal model
model = Multimodal(model1, model2, model3)

# Load the model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
model.load_state_dict(torch.load('partially_frozen_multimodel.pt', map_location=device, weights_only=True))
model.eval()

# Generate the plot
def generate_plot(title: str, model: AutoModelForSeq2SeqLM, tokenizer: AutoTokenizer, device) -> str:
    quote = 'What is the story of the movie {}?'
    model_gen.to(device)
    model_gen.eval()

    input_ids = tokenizer(quote.format(title), return_tensors='pt').input_ids.to(device)
    output = model.generate(input_ids, max_length=256, do_sample=True, temperature=0.09)
    return tokenizer.decode(output[0], skip_special_tokens=True)

# Predict the genres
def inference(title, image, 
              tokenizer1=tokenizer1, tokenizer2=tokenizer2, tokenizer_gen=tokenizer_gen,
              model_gen=model_gen, model=model, 
              genres=genres, device=device):
    title_input = tokenizer1(title, return_tensors='pt', padding=True, truncation=True)
    title_input_ids = title_input['input_ids'].to(device)
    title_attention_mask = title_input['attention_mask'].to(device)

    plot = generate_plot(title, model_gen, tokenizer_gen, device)
    plot_input = tokenizer2(plot, return_tensors='pt', padding=True, truncation=True)
    plot_input_ids = plot_input['input_ids'].to(device)
    plot_attention_mask = plot_input['attention_mask'].to(device)

    # If image is not uploaded
    if image is None:
        image_input = torch.zeros((1, 3, 224, 224)).to(device)

    else:
        # image_input = np.resize(image, (224, 224, image.shape[-1]))
        # image_input = v2.ToTensor()(image_input)
        # image_input = image_input.unsqueeze(0)
        # image_input = image_input.to(device)
 
        image = Image.open(image).convert("RGB")
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        image_input = transform(image).unsqueeze(0).to(device)

    output = model(title_input_ids, title_attention_mask, plot_input_ids, plot_attention_mask, image_input)
    output = torch.sigmoid(output)
    output = output.cpu().detach().numpy()
    output = np.where(output > 0.5, 1, 0)
    output = output.squeeze()
    output = np.where(output == 1)[0]
    output = [genres[i] for i in output]
    return output