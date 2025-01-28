import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Card.css";
import ReactCardFlip from "react-card-flip";
import { UserContext } from "../../../Context/UserContext";

function Card({
  isFlipped,
  setIsVerification,
  setSignupEmail,
  setSignupName,
  setSignupPassword,
  signupPassword,
  signupEmail,
  signupName,
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
    if (token && location.pathname === "/") {
      if (user?.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      }
      if (user?.role === "student") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  const togglePassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const SubmitSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `http://localhost:3000/auth/verify-email`,
        {
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }
      );

      alert(result.data.message);

      if (result.data.message) {
        setSignupEmail(signupEmail),
          setSignupName(signupName),
          setSignupPassword(signupPassword);

        setIsVerification(true);
      }

      setMessage("");
    } catch (err) {
      if (err.response) {
        setErr(true);
        setMessage(err.response.data.message);
      } else {
        setErr(true);
        setMessage("An error occurred. Please try again.");
      }
      setTimeout(() => {
        setErr(false);
        setMessage("");
      }, 3000);
    }
  };

  const SubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`http://localhost:3000/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      setMessage(result.data.message);

      if (result.data.success) {
        const user = result.data;
        localStorage.setItem("token", result.data.jwtToken);
        localStorage.setItem("user", JSON.stringify(result.data));

        setErr(false);
        if (user?.role === "student") window.location.href = "/dashboard";
        else {
          window.location.href = "/admin-dashboard";
        }
      }
    } catch (err) {
      if (err.response) {
        setErr(true);
        setMessage(err.response.data.message);
      } else {
        setErr(true);
        setMessage("An error occurred. Please try again.");
      }
      setTimeout(() => {
        setMessage("");
        setErr(false);
      }, 3000);
    }
  };

  return (
    <div className="Landing-card" id="landing-card">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <form
          id="card-form"
          name="login-card"
          className="card"
          onSubmit={SubmitLogin}
        >
          <h1 className="card-header">Login</h1>

          <div className="card-info">
            <div className="form-icon">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <input
              type="email"
              className="card-input"
              value={loginEmail}
              name="email"
              placeholder="Enter email "
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <div className="form-icon"></div>
          </div>

          <div className="card-info">
            <div className="form-icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="card-input"
              name="password"
              placeholder="Enter password "
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="form-icon-2" onClick={togglePassword}>
              <ion-icon
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                class="eye-icon"
              ></ion-icon>{" "}
            </div>
          </div>

          <Link to="forgot-password" className="card-forgot">
            Forgotten Password?
          </Link>

          <button type="submit" className="card-btn">
            Login
          </button>
          {message && (
            <p className={`message ${err ? "error" : "success"}`}>{message}</p>
          )}
        </form>

        <form
          className="card card-back"
          name="signup-card"
          onSubmit={SubmitSignup}
        >
          <h1 className="card-header">Sign up</h1>
          <div className="card-info">
            <div className="form-icon">
              {" "}
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <input
              className="card-input"
              placeholder="Enter name"
              type="text"
              value={signupName}
              name="name"
              onChange={(e) => setSignupName(e.target.value)}
            />
          </div>
          <div className="card-info">
            <div className="form-icon">
              <ion-icon name="mail-outline"></ion-icon>
            </div>

            <input
              className="card-input"
              type="email"
              value={signupEmail}
              name="email"
              placeholder="Enter email"
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>

          <div className="card-info">
            <div className="form-icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </div>

            <input
              className="card-input"
              type="password"
              name="password"
              placeholder="Enter password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="card-btn">
            Sign up
          </button>
          {message && (
            <p className={`message ${err ? "error" : "success"}`}>{message}</p>
          )}
        </form>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
