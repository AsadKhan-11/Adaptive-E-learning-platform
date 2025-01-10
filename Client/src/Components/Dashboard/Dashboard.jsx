import React, { useEffect, useState } from "react";
import chart from "../../assets/piechart.png";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../../Context/LoaderContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [user, setUser] = useState({});
  const { setIsLoading } = useLoader();

  const [average, setAverage] = useState();
  const navigate = useNavigate();

  const [userStats, setUserStats] = useState({
    totalCorrect: 0,
    totalAttempts: 0,
    averageCorrect: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const userResponse = await axios.get(
          `https://adaptive-e-learning-platform-11.onrender.com/api/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userResponse.data.user);
        localStorage.setItem("user", JSON.stringify(userResponse.data));

        const averageResponse = await axios.get(
          `https://adaptive-e-learning-platform-11.onrender.com/api/user/average`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserStats({
          totalCorrect: averageResponse.data.totalCorrect,
          totalAttempts: averageResponse.data.totalAttempts,
          averageCorrect: averageResponse.data.averageCorrect,
        });
      } catch (error) {
        console.error("Error during data fetching:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, setIsLoading]);

  if (!user) {
    setIsLoading(true);
  }

  const pieData = {
    labels: ["Correct Answers", "Incorrect Answers"], // Labels for each section of the pie
    datasets: [
      {
        data: [
          userStats.totalCorrect,
          userStats.totalAttempts - userStats.totalCorrect, // Incorrect answers = totalAttempts - totalCorrect
        ],
        backgroundColor: ["#36A2EB", "#FF6384"], // Colors for each section of the pie
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow resizing without maintaining the aspect ratio
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard-items">
        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Student</h3>
          <p className="Dashboard-num">{user.name}</p>
        </div>
        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Average Correct Answers</h3>
          {userStats.averageCorrect !== null &&
          !isNaN(userStats.averageCorrect) ? (
            <p className="Dashboard-num">
              {userStats.averageCorrect.toFixed(2)}%
            </p>
          ) : (
            <p className="Dashboard-num">0%</p>
          )}
        </div>

        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Time Spent</h3>
          <p className="Dashboard-num">04:33:28</p>
        </div>
        <div className="Dashboard-container Dashboard-progress ">
          <Pie data={pieData} height={20} width={20} options={pieOptions} />
        </div>
        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Course Details</h3>
          <div className="Dashboard-detail-container">
            <h4 className="Dashboard-num">Course Name:</h4>
            <p className="Dashboard-detail">Web Devlopment</p>
          </div>

          <div className="Dashboard-detail-container">
            <h4 className="Dashboard-num">Course Progress:</h4>
            <p className="Dashboard-detail">40%</p>
          </div>

          <div className="Dashboard-detail-container">
            <h4 className="Dashboard-num">Course Difficulty:</h4>
            <p className="Dashboard-detail">Intermediate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
