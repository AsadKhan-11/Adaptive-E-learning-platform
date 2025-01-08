import React, { useEffect, useState } from "react";
import "./Reset.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../../Context/LoaderContext";
function Reset() {
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const { setIsLoading } = useLoader();

  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:3000/auth/reset-token",
          {
            token,
          }
        );
        if (response.data.valid) {
          setErr(false);
        } else {
          setMessage("Invalid or expired reset token.");
          setErr(true);
        }
      } catch (error) {
        navigate("/");
      } finally {
        setTimeout(() => {
          setErr(false);
          setMessage("");
        }, 3000);
        navigate("/");
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, navigate, setIsLoading]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setErr(true);
      setTimeout(() => {
        setErr(false);
        setMessage("");
      }, 3000);
      return;
    }

    try {
      // Make API call to reset the password
      const response = await axios.post(
        `http://localhost:3000/auth/reset-password`,
        {
          token,
          password,
        }
      );

      setMessage(response.data.message);
      setErr(false);
      setTimeout(() => {
        setErr(false);
        setMessage("");
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage(error.response.data.message);
      setErr(true);
      setTimeout(() => {
        setErr(false);
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="reset">
      <div className="reset-container">
        <form className="reset-card" onSubmit={handleReset}>
          <h1 className="card-header">Reset Password</h1>
          <div className="card-info">
            <div className="form-icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </div>
            <input
              type="password"
              className="card-input"
              name="password"
              placeholder="Enter password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="card-info">
            <div className="form-icon">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <input
              type="password"
              className="card-input"
              value={confirmPassword}
              name="confirm-password"
              placeholder="Confirm Password "
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="card-btn">
            Reset
          </button>
          {message && (
            <p className={`message ${err ? "error" : "success"}`}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Reset;
