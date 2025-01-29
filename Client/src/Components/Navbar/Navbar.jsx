import React, { useContext, useEffect } from "react";
import Nexedu from "../../assets/NEXEDU.png";
import "./Navbar.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function Navbar({
  navText,
  setNavText,
  setIsFlipped,
  isFlipped,
  isVerification,
}) {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const handleNavClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      logout();
      setNavText("Signup");
      setIsFlipped(false);
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    setNavText(token ? "Logout" : "Signup");
  }, [token]);

  return (
    <div
      className={`Navbar-sec ${isLoginPage || isForgotPage ? "nav-first" : " "}
          
      `}
    >
      <div className="nav-container">
        <img src={Nexedu} alt="Logo" className="nav-logo" />

        {isVerification ? null : (
          <Link to={"/"} className="nav-sign-btn" onClick={handleNavClick}>
            {navText}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
