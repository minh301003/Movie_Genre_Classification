import os
from model import Movie
from classifier import generate_plot, inference, tokenizer1, tokenizer2, tokenizer_gen, model_gen, model, device
from fastapi import UploadFile

UPLOAD_FOLDER = "./static"
genres = ["Crime", "Thriller", "Fantasy", "Horror", "Sci-Fi", "Comedy", "Documentary", "Adventure", "Film-Noir", "Animation", "Romance", "Drama", "Western", "Musical", "Action", "Mystery", "War", "Children\'s"]

async def create_movie(title: str, description: str, poster: UploadFile):
    # Save poster
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    poster_path = os.path.join(UPLOAD_FOLDER, poster.filename)
    with open(poster_path, "wb") as buffer:
        buffer.write(await poster.read())

    if (description == ""):
        description = generate_plot(title, model_gen, tokenizer_gen, device)
    
    # Classify genres
    output = inference(title, poster_path, tokenizer1, tokenizer2, tokenizer_gen, model_gen, model, genres, device)

    movie = Movie(
        title=title,
        description=description,
        poster_path=poster_path,
        genres=", ".join(output)
    )
    return movie

