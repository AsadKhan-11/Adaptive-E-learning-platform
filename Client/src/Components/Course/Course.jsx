import React from "react";
import "./Course.css";
import image from "../../assets/Background.jpg";
function Course() {
  return (
    <div className="course">
      <div className="course-container">
        <img src={image} className="course-image" />
        <h2 className="course-name">Web development course</h2>
        <p className="course-duration">Duration 3 months</p>
      </div>
    </div>
  );
}

export default Course;
