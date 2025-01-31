import React, { useCallback, useEffect, useState } from "react";
import "./Course.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "./Data";
import { useLoader } from "../../Context/LoaderContext";
import image1 from "./images/image1.png";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpg";
import image5 from "./images/image5.jpg";
import image6 from "./images/image6.avif";

import Config from "../../Config/Config";

function Course() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("token");

  const { setIsLoading } = useLoader();

  const imageMapping = [image1, image2, image3, image4, image5, image6];

  const fetchCourse = useCallback(async () => {
    try {
      setIsLoading(true);
      const info = await axios.get(`${Config.API_URL}/api/course`, {
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

  const handleClick = async (courseId) => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/api/course/enrollment/${courseId}`,
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
      {course.map((course, index) => (
        <div
          className="course-container"
          key={course._id}
          onClick={() => handleClick(course._id)}
        >
          <img className="course-image" src={imageMapping[index]} alt="image" />
          <h2 className="course-name">{course.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Course;
