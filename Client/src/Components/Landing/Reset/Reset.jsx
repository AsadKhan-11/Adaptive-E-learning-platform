import React, { useState } from "react";
import "./Reset.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function Reset() {
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
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

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="reset">
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
      </form>
    </div>
  );
}

export default Reset;
