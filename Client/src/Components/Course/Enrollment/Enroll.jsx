import React, { useEffect, useState } from "react";
import "./Enroll.css";
import html2 from "../images/html2.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderContext";
import Config from "../../../Config/Config";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Enroll() {
  const { courseId } = useParams();
  const [enroll, setEnroll] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/api/course/enrollment/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnroll(response.data.courses);
      } catch (err) {
        toast.error(err.response.data.error);
        console.error("Error checking enrollment status:", err);
      } finally {
      }
    };
    checkEnrollment();
  }, []);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/course/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success(err.response.data.error), {};
        navigate(`/course/${courseId}/quiz`);
      }
    } catch (err) {
      toast.error(err.response.data.error), {};
      console.error("Error checking enrollment status:", err);
    }
  };

  return (
    <div className="enroll">
      <div className="enroll-container">
        <p className="enroll-desc">{enroll.description}</p>

        <img src={html2} alt="enrollment image" className="enroll-img" />
      </div>
      <button className="enroll-btn" onClick={handleClick}>
        {"Enroll"}
      </button>
      <ToastContainer />
    </div>
  );
}

export default Enroll;
