from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    poster_path = Column(String)
    genres = Column(String)

