import React, { useState } from "react";
import "./Forgot.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../../Context/LoaderContext";
function Forgot() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const { setIsLoading } = useLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // Replace with your backend endpoint
      const response = await axios.post(
        "https://complex-giant-need.glitch.me/auth/forgot-password",
        { email }
      );

      setErr(false);
      setMessage(response.data.message);
    } catch (err) {
      setErr(true);
      setMessage(err.response.data.message);
    } finally {
      setTimeout(() => {
        setErr(false);
        setMessage("");
      }, 3000);
      setIsLoading(false);
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
        {message && (
          <p className={`message ${err ? "error" : "success"}`}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Forgot;
