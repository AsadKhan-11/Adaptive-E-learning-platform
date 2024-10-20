import React from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ navText, handleNavClick }) {
  return (
    <div
      className={
        navText === "Signup" || navText === "Login"
          ? "Navbar-sec nav-first"
          : "Navbar-sec"
      }
    >
      <div className="nav-container">
        <img src={Nexedu} alt="" className="nav-logo" />

        <Link to={"/"} className="nav-sign-btn" onClick={handleNavClick}>
          {navText}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
