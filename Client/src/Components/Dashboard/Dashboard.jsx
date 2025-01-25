import React, { useEffect, useState } from "react";
import chart from "../../assets/piechart.png";
import "./Dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../../Context/LoaderContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const { courseId } = useParams();
  const [user, setUser] = useState({});
  const { setIsLoading } = useLoader();

  const navigate = useNavigate();

  const [courseStats, setCourseStats] = useState([]);

  const [userStats, setUserStats] = useState({
    totalCorrect: 0,
    totalAttempts: 0,
    overallAverage: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userResponse = await axios.get(`http://localhost:3000/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data.user);

        localStorage.setItem("user", JSON.stringify(userResponse.data));

        const averageResponse = await axios.get(
          `http://localhost:3000/api/user/average`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourseStats(averageResponse.data.results);
        setUserStats({
          totalCorrect: averageResponse.data.overallStats.totalCorrect,
          totalAttempts: averageResponse.data.overallStats.totalAttempts,
          overallAverage: averageResponse.data.overallStats.overallAverage,
        });
      } catch (error) {
        console.error("Error during data fetching:", error);
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
        data:
          userStats.totalAttempts > 0
            ? [
                userStats.totalCorrect,
                userStats.totalAttempts - userStats.totalCorrect, // Incorrect answers
              ]
            : [1, 0],
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
        labels: {
          color: "#212121", // Set the label text color
          font: {
            size: 12, // Set the font size for labels
            weigh: "bold", // Set the font family for labels
          },
        },
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
          {userStats.overallAverage !== null &&
          !isNaN(userStats.overallAverage) ? (
            <p className="Dashboard-num">
              {userStats.overallAverage.toFixed(2)}%
            </p>
          ) : (
            <p className="Dashboard-num">0%</p>
          )}
        </div>

        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Achievements</h3>
          {userStats.overallAverage > 80 ? (
            <p className="Dashboard-num">Quiz Master</p>
          ) : userStats.overallAverage > 60 ? (
            <p className="Dashboard-num">Well done!</p>
          ) : userStats.overallAverage > 40 ? (
            <p className="Dashboard-num">Keep it going</p>
          ) : (
            <p p className="Dashboard-num">
              No achievements yet.
            </p>
          )}
        </div>
        <div className="Dashboard-container Dashboard-progress ">
          <Pie data={pieData} height={20} width={20} options={pieOptions} />
        </div>
        <div className="Dashboard-container Course-completion">
          <div className="Dashboard-detail-container">
            <h3 className="Dashboard-name">Course </h3>
            <h3 className="Dashboard-name">Progress </h3>
          </div>
          <hr style={{ height: "1px", width: "200px" }} />
          {courseStats && courseStats.length > 0 ? (
            courseStats.map((course, index) => (
              <div key={index}>
                <div
                  className="Dashboard-detail-container d1"
                  onClick={() => {
                    window.location.href = `/course/${course._id}/answers`;
                  }}
                >
                  <h3 className="Dashboard-name">{course.courseName}</h3>
                  <p className="Dashboard-num">
                    {course.averageCorrect.toFixed(2)}%
                  </p>
                </div>
                <hr style={{ height: "1px", width: "200px" }} />
              </div>
            ))
          ) : (
            <div className="Dashboard-completion">
              <div className="Dashboard-detail-container d1">
                <h3 className="Dashboard-num">none</h3>
                <p className="Dashboard-num">none</p>
              </div>
              <hr style={{ height: "1px", width: "200px" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
