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
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );

      alert(response.data.message);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
