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

  const [courses, setCourses] = useState([]);
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
        try {
          setIsLoading(true);

          const response = await axios.get(
            "https://adaptive-e-learning-platform-11.onrender.com/api/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setCourses(response.data.courses);
        } catch (error) {
          console.error("Error during data fetching :", error);
        }
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
          <h3 className="Dashboard-name">Achievements</h3>
          {userStats.averageCorrect > 80 ? (
            <p className="Dashboard-num">Quiz Master</p>
          ) : userStats.averageCorrect > 60 ? (
            <p className="Dashboard-num">Well done!</p>
          ) : userStats.averageCorrect > 40 ? (
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
            <h3 className="Dashboard-num">Completion </h3>
          </div>
          <hr style={{ height: "1px", width: "200px" }} />
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index}>
                <div className="Dashboard-detail-container d1">
                  <h3 className="Dashboard-name">{course.title}</h3>
                  <p className="Dashboard-name">40%</p>
                </div>
                <hr style={{ height: "1px", width: "200px" }} />
              </div>
            ))
          ) : (
            <div className="Dashboard-completion">
              <div className="Dashboard-detail-container">
                <h3 className="Dashboard-name">none</h3>
                <p className="Dashboard-name">none</p>
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
