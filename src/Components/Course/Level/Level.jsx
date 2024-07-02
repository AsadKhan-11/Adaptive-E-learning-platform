import React from "react";
import "./Level.css";
function Level() {
  return (
    <div className="level">
      <h1 className="level-header">Choose Your Level</h1>
      <div className="level-items">
        <div className="level-container">
          <button className="level-btn">Beginner</button>
          <p className="course-duration"></p>
        </div>
        <div className="level-container">
          <button className="level-btn">Intermediate</button>
          <p className="course-duration"></p>
        </div>
        <div className="level-container">
          <button className="level-btn">Expert</button>
          <p className="course-duration"></p>
        </div>
      </div>
    </div>
  );
}

export default Level;
