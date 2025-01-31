import React from "react";
import { Link } from "react-router-dom";
import "./Error.css"; // Optional: for styling

const Error404 = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="error-link">
        Go to Home
      </Link>
    </div>
  );
};

export default Error404;
