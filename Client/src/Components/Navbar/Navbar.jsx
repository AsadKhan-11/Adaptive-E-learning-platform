import React from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar({ navText, handleNavClick }) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <div
      className={`Navbar-sec ${isLoginPage ? "nav-first" : " "}
          
      `}
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