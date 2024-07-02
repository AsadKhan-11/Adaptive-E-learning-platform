import React from "react";
import "./Level.css";
function Level() {
  return (
    <div className="level">
      <h1 className="level-header">Choose Your Level</h1>
      <div className="level-items">
        <div className="level-container">
          <h2 className="level-name">Beginner</h2>
          <p className="course-duration"></p>
        </div>
        <div className="level-container">
          <h2 className="level-name">Intermediate</h2>
          <p className="course-duration"></p>
        </div>
        <div className="level-container">
          <h2 className="level-name">Expert</h2>
          <p className="course-duration"></p>
        </div>
      </div>
    </div>
  );
}

export default Level;
