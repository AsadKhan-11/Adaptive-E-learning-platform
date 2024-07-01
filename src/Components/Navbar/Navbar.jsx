import React from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";

function Navbar({ navText, handleNavClick }) {
  return (
    <div className="Navbar-sec">
      <img src={Nexedu} alt="" className="nav-logo" />
      {/* <nav className="nav-link-wrapper">
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
          About Us
        </a>
      </nav> */}
      <button className="nav-sign-btn">
        {" "}
        <a href="#landing-card" className="nav-sign" onClick={handleNavClick}>
          {navText}
        </a>
      </button>
    </div>
  );
}

export default Navbar;
