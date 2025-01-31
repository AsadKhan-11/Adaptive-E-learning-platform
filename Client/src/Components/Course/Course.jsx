import React, { useCallback, useEffect, useState } from "react";
import "./Course.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "./Data";
import { useLoader } from "../../Context/LoaderContext";
import html from "./images/html.png";
import css from "./images/css.jpg";

function Course() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("token");

  const { setIsLoading } = useLoader();

  const fetchCourse = useCallback(async () => {
    try {
      setIsLoading(true);
      const info = await axios.get(
        `https://complex-giant-need.glitch.me/api/course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourse(info.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleClick = async (courseId) => {
    try {
      const response = await axios.get(
        `https://complex-giant-need.glitch.me/api/course/enrollment/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.enrolled) {
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
      {course.map((course) => (
        <div
          className="course-container"
          key={course._id}
          onClick={() => handleClick(course._id)}
        >
          <img
            className="course-image"
            src={course.imageUrl} // Default image fallback
            alt="Course-Img"
          />
          <h2 className="course-name">{course.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Course;
