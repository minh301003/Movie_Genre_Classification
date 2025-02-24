# Movie_Genre_Classfication

## Project Overview

This project is a web application that use multimodal for film genres classification task based on title, description and poster. This model integrates three different sub-models to process and combine information from various sources: movie titles, plot descriptions, and poster images.

- Model 1: A DistilBERT-based model for processing and classifying movie titles.
- Model 2: Another transformer-based model for processing and classifying plot descriptions.
- Model 3: A Vision Transformer (T2t_vit_14) model for processing and classifying poster images.

The Multimodal class combines the outputs of these three sub-models through fully connected layers to produce a final genre classification. The model is designed to leverage the strengths of each sub-model, providing a comprehensive understanding of the movie's content from multiple perspectives.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (for the frontend)
- Python 3.9+ (for the backend)
- pip (Python package installer)



## Running the Backend

1. **Clone the repository:**

    ```sh
    git clone https://github.com/minh301003/Movie_Genre_Classification.git
    cd Movie_Genre_Classification
    ```

2. **Navigate to the backend directory:**

    ```sh
    cd Backend
    ```

3. **Create and activate a virtual environment (optional but recommended):**

    ```sh
    python -m venv env
    source env/bin/activate  # On Windows, use `env\Scripts\activate`
    ```

4. **Install the required dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

5. **Run the FastAPI server:**

    ```sh
    uvicorn main:app --reload
    ```

    The backend server should now be running at `http://127.0.0.1:8000`.

## Running the Frontend

1. **Navigate to the frontend directory:**

    ```sh
    cd ../Frontend
    ```

2. **Install the required dependencies:**

    ```sh
    npm install
    ```

3. **Start the React development server:**

    ```sh
    npm run dev
    ```

    The frontend server should now be running at `http://localhost:5173`.

## Accessing the Application

- Open your web browser and navigate to `http://localhost:5173` to access the frontend.
- The frontend will communicate with the backend server running at `http://127.0.0.1:8000`.

## Additional Information

- **Database:** The backend uses SQLite as the database. The database file (`movies.db`) is located in the [Backend](http://_vscodecontentref_/1) directory.
- **Static Files:** The backend serves static files (e.g., movie posters) from the [static](http://_vscodecontentref_/2) directory.



