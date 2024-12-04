import React from "react";
import "./Course.css";
import image from "../../assets/Background.jpg";
import { Link } from "react-router-dom";
function Course() {
  return (
    <div className="course">
      <Link to="/course/enrollment" className="course-link">
        <div className="course-container">
          <img src={image} className="course-image" />
          <h2 className="course-name">Web development course</h2>
          <p className="course-duration">Duration 3 months</p>
        </div>
      </Link>
    </div>
  );
}

export default Course;
