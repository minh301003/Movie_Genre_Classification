import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import api from "../api";


const MovieList = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies/");
        console.log(response.data);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching movies");
        setLoading(false);
      }
    };

    fetchMovies()
  }, []);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#000",
    color: "#fff",
  };

  const baseUrl = 'http://localhost:8000';

  return (
    <>
    <div className="text-center py-10 bg-black">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">{title}</h1>
    </div>
    <div>
      {loading && <p style={{ color: "white" }}>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={containerStyle}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            title={movie.title}
            description={movie.description}
            posterUrl={`${baseUrl}${movie.poster_path.replace('.', '')}`} 
            genres={movie.genres}
          />
        ))}
      </div>
    </div>
    </>
    
  );
};

export default MovieList;
