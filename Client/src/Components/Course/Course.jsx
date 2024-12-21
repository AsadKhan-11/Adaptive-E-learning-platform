import React, { useState } from "react";
import "./Course.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "./Data";
function Course() {
  const navigate = useNavigate();
  const handleClick = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      const response = axios.get(
        `http://localhost:3000/api/course/enrollment/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.enrolled) {
        navigate(`/course/${courseId}/quiz`);
      } else {
        navigate(`/course/${courseId}/enrollment`);
      }
    } catch (err) {
      console.error("Error checking enrollment status:", err);
    }
  };

  return (
    <div className="course">
      {data.map((course) => (
        <div
          className="course-container"
          key={course.courseId}
          onClick={() => handleClick(course.courseId)}
        >
          <img src={course.courseImg} className="course-image" />
          <h2 className="course-name">{course.courseTitle}</h2>
          <p className="course-duration">{course.courseDuration}</p>
        </div>
        // </Link>
      ))}
    </div>
  );
}

export default Course;
