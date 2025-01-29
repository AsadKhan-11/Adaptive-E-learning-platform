import React from "react";
import "./DashboardAdmin.css";
import LoginActivity from "./LoginActivity/LoginActivity";
const DashboardAdmin = () => {
  return (
    <div className="admin-dashboard">
      <h2>Login Activity</h2>
      <LoginActivity />
    </div>
  );
};

export default DashboardAdmin;
