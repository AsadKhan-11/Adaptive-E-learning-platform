import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderContext";
import axios from "axios";
import html from "../../Course/images/html.png";
import css from "../../Course/images/css.jpg";
import "./CourseAdmin.css";

const CourseAdmin = () => {
  const imageMapping = {
    "67670d9599b56943a89a45fb": html,
    "6767ccc42cbd1950877526c4": css,
  };
  const navigate = useNavigate();
  const [toggleCourse, setToggleCourse] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/addcourse",
        {
          title,
          description: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDesc("");

      fetchCourse();

      setToggleCourse(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/deletecourse/${courseId}`
      );
      console.log(response);
      fetchCourse();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const showModal = () => {
    setToggleCourse(!toggleCourse);
  };

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <div className="course-admin">
      {course.map((course) => (
        <div
          className="course-container"
          key={course._id}
          onClick={() => navigate(`/admin-course/${course._id}/questions`)}
        >
          <button
            className="remove-button"
            onClick={() => handleDelete(course._id)}
          >
            x
          </button>
          <img
            className="course-image"
            src={imageMapping[course._id]} // Default image fallback
            alt="Course-Img"
          />
          <h2 className="course-name">{course.title}</h2>
        </div>
      ))}
      <div className="course-container add-course" onClick={showModal}>
        +
      </div>

      {toggleCourse && (
        <div className="course-modal">
          <div className="modal-content">
            <form className="course-add" onSubmit={handleSubmit}>
              {" "}
              <h4 className="course-title">Course Title</h4>
              <input
                type="text"
                className="course-input"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <h4 className="course-title">Course Description</h4>
              <textarea
                type="textarea"
                className="course-input course-txt"
                rows="4"
                placeholder="Enter course description..."
                name="description"
                cols="50"
                required
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              ></textarea>
              <button type="submit">Submit</button>
            </form>
            <button className="remove-button" onClick={showModal}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAdmin;
