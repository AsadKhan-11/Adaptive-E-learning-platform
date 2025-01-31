import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderContext";
import axios from "axios";
import "./CourseAdmin.css";
import Config from "../../../Config/Config";
import image1 from "../../Course/images/image1.png";
import image2 from "../../Course/images/image2.jpg";
import image3 from "../../Course/images/image3.jpg";
import image4 from "../../Course/images/image4.jpg";
import image5 from "../../Course/images/image5.jpg";
import image6 from "../../Course/images/image6.avif";

const CourseAdmin = () => {
  const imageMapping = [image1, image2, image3, image4, image5, image6];
  const navigate = useNavigate();
  const [toggleCourse, setToggleCourse] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("token");

  const { setIsLoading } = useLoader();

  const fetchCourse = useCallback(async () => {
    try {
      setIsLoading(true);
      const info = await axios.get(`${Config.API_URL}/api/course`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(info.data);
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
        `${Config.API_URL}/api/addcourse`,
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Course added successfully:", response.data);
      setTitle("");
      setDesc("");

      fetchCourse();
      setToggleCourse(false);
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (!confirmDelete) return;
      const response = await axios.delete(
        `${Config.API_URL}/api/deletecourse/${courseId}`
      );
      fetchCourse();
      alert("Course deleted successfully!");
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
      {course.map((course, index) => (
        <div
          className="course-container"
          key={course._id}
          onClick={() => navigate(`/admin-course/${course._id}/questions`)}
        >
          <button
            className="remove-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(course._id);
            }}
          >
            x
          </button>
          <img className="course-image" src={imageMapping[index]} alt="image" />
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
              <div className="part-container">
                <h4 className="course-title">Course Title</h4>
                <input
                  type="text"
                  className="course-input"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="part-container">
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
              </div>
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
