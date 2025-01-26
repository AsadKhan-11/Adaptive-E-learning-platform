import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderContext";
import axios from "axios";

const CourseAdmin = () => {
  const imageMapping = {
    "67670d9599b56943a89a45fb": html,
    "6767ccc42cbd1950877526c4": css,
  };

  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("token");

  const { setIsLoading } = useLoader();

  const fetchCourse = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <div className="course-admin">
      {course.map((course) => (
        <div
          className="course-container"
          key={course._id}
          onClick={() => handleClick(course._id)}
        >
          <img
            className="course-image"
            src={imageMapping[course._id]} // Default image fallback
            alt="Course-Img"
          />
          <h2 className="course-name">{course.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default CourseAdmin;
