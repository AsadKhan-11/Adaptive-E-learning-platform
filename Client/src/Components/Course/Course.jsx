import React, { useState } from "react";
import "./Course.css";
import html from "./images/html.png";
import css from "./images/css.jpg";
import js from "./images/js.png";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "./Data";
function Course() {
  const handleClick = async (courseId) => {
    const token = localStorage.getItem("token");
    const response = axios.get(`http://localhost:3000/api/course/${courseId}`);
  };

  return (
    <div className="course">
      {data.map((course) => (
        <Link
          to="/course/enrollment"
          className="course-link"
          key={course.courseId}
          onClick={handleClick(course.courseId)}
        >
          <div className="course-container">
            <img src={course.courseImg} className="course-image" />
            <h2 className="course-name">{course.courseTitle}</h2>
            <p className="course-duration">{course.courseDuration}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Course;
