import React from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar({ navText, setNavText, setIsFlipped, isFlipped }) {
  const handleNavClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setNavText("Signup");
      setIsFlipped(false);
      Navigate("/");
    } else {
      setIsFlipped(!isFlipped);
      setNavText(isFlipped ? "Signup" : "Login");
    }
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div
      className={`Navbar-sec ${isLoginPage ? "nav-first" : " "}
          
      `}
    >
      <div className="nav-container">
        <img src={Nexedu} alt="" className="nav-logo" />

        <Link
          to={isLoginPage ? "/" : "/dashboard"}
          className="nav-sign-btn"
          onClick={handleNavClick}
        >
          {navText}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
