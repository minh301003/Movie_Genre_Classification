import PropTypes from "prop-types";

const Movie = ({ title, description, posterUrl, genres }) => {

  const styles = {
    card: {
      maxHeight: "900px",
      backgroundColor: "#1c1c1c",
      color: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s ease-in-out",
    },
    poster: {
      width: "100%",
      height: "500px",
      objectFit: "cover",
    },
    content: {
      padding: "16px",
    },
    title: {
      fontSize: "1.2em",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    description: {
      fontSize: "0.9em",
      color: "#aaa",
      marginBottom: "8px",
    },
    genres: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    genreBadge: {
      backgroundColor: "#ff6347",
      color: "#fff",
      fontSize: "0.8em",
      padding: "4px 8px",
      borderRadius: "4px",
    },
  };

  const genreArray = genres.split(', ');


  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img src={posterUrl} alt={title} style={styles.poster} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <div style={styles.genres}>
          {genreArray.map((genre, index) => (
            <span key={index} style={styles.genreBadge}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


Movie.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
};

export default Movie;
