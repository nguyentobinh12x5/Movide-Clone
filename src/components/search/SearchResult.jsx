import React, { useState, useEffect } from "react";
import "./SearchResult.css";

import MovieDetail from "../browse/MovieDetail";

const base_url = "https://image.tmdb.org/t/p/original";

const SearchResult = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [moviesDetail, setMoviesDetail] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/movies/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const movies = await response.json();
      setMovies(movies);
    }
    if (query) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [query]);
  const handleClick = (movie) => {
    if (moviesDetail && moviesDetail.id === movie.id) {
      setMoviesDetail(null);
    } else {
      setMoviesDetail(movie);
    }
  };
  return (
    <div className="row">
      <h2>Search Result</h2>
      {moviesDetail && <MovieDetail movieData={moviesDetail} />}
      <div className="row_posters search-resul-container sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
