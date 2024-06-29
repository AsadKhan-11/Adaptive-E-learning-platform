import React from "react";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="Navbar-sec">
      <h1 className="nav-header">Learn Genie</h1>

      <nav className="nav-link-wrapper">
        <a href="" className="nav-link">
          Home
        </a>
        <a href="" className="nav-link">
          Profile
        </a>
        <a href="" className="nav-link">
          Courses
        </a>
        <a href="" className="nav-link">
          Progress
        </a>
        <a href="" className="nav-link">
          Help
        </a>
      </nav>
      <a href="" className="nav-sign">
        Sign-up / Login
      </a>
    </div>
  );
}

export default Navbar;
