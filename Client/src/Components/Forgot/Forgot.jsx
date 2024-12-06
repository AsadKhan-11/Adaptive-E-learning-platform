import React from "react";
import "./Forgot.css";
function Forgot() {
  return (
    <div className="Forgot">
      <form id="card-form" name="login-card" className="card">
        <h1 className="card-header">Login</h1>

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

        <div className="card-info">
          <div className="form-icon">
            <ion-icon name="lock-closed-outline"></ion-icon>
          </div>
          <input
            type="password"
            className="card-input"
            name="password"
            placeholder="Enter password "
          />
        </div>

        <a className="card-forgot">Forgotten Password?</a>

        <button type="submit" className="card-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Forgot;
