import React, { useState, useEffect } from "react";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const movies_limit = 10;
const base_url = "https://image.tmdb.org/t/p/original/";
function MovieList({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/movies/${fetchUrl}`);
      const data = await response.json();
      const movie = data.results;
      return setMovies(movie);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };
  movies.sort((a, b) => b.popularity - a.popularity);
  movies.splice(movies_limit);

  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && <MovieDetail movieData={selectedMovie} />}
      </div>
    </div>
  );
}

export default MovieList;
