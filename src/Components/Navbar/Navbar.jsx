import React from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ navText, handleNavClick }) {
  return (
    <div className="Navbar-sec">
      <div className="nav-container">
        <img src={Nexedu} alt="" className="nav-logo" />

        <button className="nav-sign-btn" onClick={handleNavClick}>
          <Link to={"/"} className="nav-sign">
            {navText}
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
