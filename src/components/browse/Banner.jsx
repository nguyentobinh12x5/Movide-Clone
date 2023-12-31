import React, { useState, useEffect } from "react";
import "./Banner.css";
import requests from "../../utils/request";
function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/movies/${requests.fetchNetflixOriginals}`
      );
      const data = await response.json();
      const movies = data.results;
      console.log(movies);
      setMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
      return response;
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
				"https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
				)`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
