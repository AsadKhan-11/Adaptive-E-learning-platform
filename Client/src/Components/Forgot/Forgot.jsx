import React, { useState } from "react";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your backend endpoint
      await axios.post("http://localhost:3000/auth/forgot-password", { email });

      setMessage("A password reset link has been sent to your email.");
      alert(message);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError("There was an error sending the password reset email.");

      alert(error);
    }
  };

  return (
    <div className="forgot">
      <form
        id="forgot-form"
        name="forgot-card"
        className="forgot-card"
        onSubmit={handleSubmit}
      >
        <h1 className="forgot-header" style={{ margin: "10px" }}>
          Forgotten Password
        </h1>

        <div className="card-info">
          <div className="form-icon">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          <input
            type="email"
            className="card-input"
            name="email"
            placeholder="Enter email "
          />
        </div>

        <button type="submit" className="card-btn">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default Forgot;
