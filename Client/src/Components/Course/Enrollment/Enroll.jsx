import React, { useEffect, useState } from "react";
import "./Enroll.css";
import html2 from "../images/html2.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Enroll() {
  const { courseId } = useParams();
  const [enroll, setEnroll] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const checkEnrollment = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/course/enrollment/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnroll(response.data.courses);
      } catch (err) {
        console.error("Error checking enrollment status:", err);
      } finally {
        setLoading(false);
      }
    };
    checkEnrollment();
  }, []);

  const handleClick = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/course/enroll/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
        <p className="enroll-desc">{enroll.description}</p>

        <img src={html2} alt="enrollment image" className="enroll-img" />
      </div>
      <button className="enroll-btn" onClick={handleClick} disabled={loading}>
        {loading ? "Processing" : "Enroll"}
      </button>
    </div>
  );
}

export default Enroll;
