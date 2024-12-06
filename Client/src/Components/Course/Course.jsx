import React from "react";
import "./Course.css";
import html from "./images/html.png";
import css from "./images/css.jpg";
import js from "./images/js.png";
import { Link } from "react-router-dom";
function Course() {
  return (
    <div className="course">
      <Link to="/course/enrollment" className="course-link">
        <div className="course-container">
          <img src={html} className="course-image" />
          <h2 className="course-name">HTML course</h2>
          <p className="course-duration">Duration 1 month</p>
        </div>
      </Link>
      <Link to="/course/enrollment" className="course-link">
        <div className="course-container">
          <img src={css} className="course-image" />
          <h2 className="course-name">CSS course</h2>
          <p className="course-duration">Duration 2 months</p>
        </div>
      </Link>
      <Link to="/course/enrollment" className="course-link">
        <div className="course-container">
          <img src={js} className="course-image" />
          <h2 className="course-name">JavaScript course</h2>
          <p className="course-duration">Duration 4 months</p>
        </div>
      </Link>
    </div>
  );
}

export default Course;
