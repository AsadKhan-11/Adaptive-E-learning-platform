import React, { useEffect } from "react";
import "./Enroll.css";
import html2 from "../images/html2.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Enroll() {
  const { courseId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleClick = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/course/enroll`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    try {
      if (response.data && response.data.success) {
        alert("You have been enrolled in this course");
        navigate(`/course/${courseId}/quiz`);
      }
    } catch (err) {
      alert("Error while enrolling try again");
      console.error("Error checking enrollment status:", err);
    }
  };

  return (
    <div className="enroll">
      <div className="enroll-container">
        <p className="enroll-desc">
          This course is designed to teach you how to create amazing websites
          from scratch using HTML. You will start by learning the basics of
          HTML, the language used to structure content on a webpage. You’ll
          discover how to create headings, paragraphs, lists, links, images, and
          more. By the end of this course, you’ll have a strong foundation in
          HTML and will be able to structure professional web pages with
          confidence!
        </p>

        <img src={html2} alt="enrollment image" className="enroll-img" />
      </div>
      <button className="enroll-btn" onClick={handleClick}>
        Enroll
      </button>
    </div>
  );
}

export default Enroll;
