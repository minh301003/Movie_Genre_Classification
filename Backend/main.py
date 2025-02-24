from fastapi import FastAPI, HTTPException, Depends, UploadFile, Form, File
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
from services import create_movie
import model
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MovieBase(BaseModel):
    title: str
    description: str
    poster_path: str

class MovieModel(MovieBase):
    id: int
    title: str
    description: str
    poster_path: str
    genres: str
    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

model.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie API"}

@app.post("/movies/", response_model=MovieModel)
async def add_movie(
    db: Session = Depends(get_db),
    title: str = Form(...),
    description: str = Form(...),
    poster_path: UploadFile = File(...),
):
    
    movie = await create_movie(title, description, poster_path)
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

@app.get("/movies/", response_model=List[MovieModel])
def get_movies(db: Session = Depends(get_db), skip: int = 0, limit: int = 1000):
    movies = db.query(model.Movie).offset(skip).limit(limit).all()
    return movies