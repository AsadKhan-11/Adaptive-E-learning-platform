import React from "react";
import chart from "../../assets/piechart.png";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="Dashboard-items">
        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Student</h3>
          <p className="Dashboard-num">Asad Ahmed Khan</p>
        </div>
        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Enrolled Courses</h3>
          <p className="Dashboard-num">1</p>
        </div>
        <div className="Dashboard-container">
          <h3 className="Dashboard-name">Time Spent</h3>
          <p className="Dashboard-num">04:33:28</p>
        </div>
        <div className="Dashboard-container Dashboard-progress ">
          <img src={chart} alt="Piechart" className="dashboard-chart" />
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
