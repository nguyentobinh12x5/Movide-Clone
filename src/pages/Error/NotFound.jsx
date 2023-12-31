import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="home-button">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
