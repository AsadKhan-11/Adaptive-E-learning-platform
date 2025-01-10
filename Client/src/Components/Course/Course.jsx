import React, { useEffect, useState } from "react";
import "./Course.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "./Data";
import { useLoader } from "../../Context/LoaderContext";
function Course() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("token");

  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const info = await axios.get(`http://localhost:3000/api/course`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(info.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, []);

  const handleClick = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/course/enrollment/${courseId}`,
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
          <img className="course-image" src="" alt="Course-Img" />
          <h2 className="course-name">{course.title}</h2>
          <p className="course-duration">{course.duration} months</p>
        </div>
      ))}
    </div>
  );
}

export default Course;
