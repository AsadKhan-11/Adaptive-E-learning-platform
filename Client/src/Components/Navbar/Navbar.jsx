import React, { useEffect } from "react";
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
      console.log("Navigating to /");
      window.location.href("/");
    } else {
      setIsFlipped((prev) => {
        const newIsFlipped = !prev;
        setNavText(newIsFlipped ? "Login" : "Signup"); // Update navText based on new state
        return newIsFlipped;
      });
    }
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isForgotPage = location.pathname === "/forgot-password";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setNavText(token ? "Logout" : "Signup");
  }, []);

  return (
    <div
      className={`Navbar-sec ${isLoginPage || isForgotPage ? "nav-first" : " "}
          
      `}
    >
      <div className="nav-container">
        <img src={Nexedu} alt="Logo" className="nav-logo" />

        {isVerification ? null : (
          <Link
            to={isLoginPage || isForgotPage ? "/" : "/dashboard"}
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
