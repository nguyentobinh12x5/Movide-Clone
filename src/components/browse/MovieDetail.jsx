import React from "react";
import YouTube from "react-youtube";
import "./MovieDetail.css";
import { useState, useEffect } from "react";
const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};

const MovieDetail = ({ movieData }) => {
  const { release_date, title, name, overview, vote_average } = movieData;
  const [trailerKey, setTrailerKey] = useState(null);
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movies/video/${movieData.id}`
        );
        const data = await response.json();
        setTrailerKey(data.key);
      } catch (error) {
        console.error("Error fetching trailer");
      }
    };
    fetchTrailer();
  }, [movieData.id]);
  return (
    <div className="movie_detail">
      <div className="movie_detail_data">
        <h1>{title || name}</h1>
        <hr></hr>

        <h3>Release Date: {release_date}</h3>
        <h3>Vote: {vote_average} / 10</h3>
        <br></br>
        <p>{overview}</p>
      </div>
      <div className="movie_detail_trailer">
        {trailerKey ? (
          <YouTube videoId={trailerKey} opts={opts} />
        ) : (
          <img
            src={`${base_url}${movieData.backdrop_path}`}
            className="movie_img"
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
