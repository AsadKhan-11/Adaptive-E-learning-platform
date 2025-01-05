import React from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

function Navbar({
  navText,
  setNavText,
  setIsFlipped,
  isFlipped,
  isVerification,
}) {
  const navigate = useNavigate();
  const handleNavClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setNavText("Signup");
      setIsFlipped(false);
      navigate("/");
    } else {
      // Toggle Login/Signup state
      setIsFlipped((prev) => {
        const newIsFlipped = !prev;
        setNavText(newIsFlipped ? "Login" : "Signup"); // Update navText based on new state
        return newIsFlipped;
      });
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
        <img src={Nexedu} alt="Logo" className="nav-logo" />

        {isVerification ? null : (
          <Link
            to={isLoginPage ? "/" : "/dashboard"}
            className="nav-sign-btn"
            onClick={handleNavClick}
          >
            {navText}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
