import React, { useState } from "react";
import axios from "axios";

import "./Card.css";
import ReactCardFlip from "react-card-flip";

function Card({ isFlipped }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);

  const SubmitSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/signUp", { name, email, password })
      .then((result) => {
        console.log(result);
        setMessage(result.data.message);
        if (result.data.message === "Account created succesfully") {
          setErr(false);
        } else if (result.data.message === "Already has an account") {
          setErr(true);
        }
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className="Landing-card" id="landing-card">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <form id="card-form" name="login-card" className="card">
          <h1 className="card-header">Login</h1>

          <div className="card-info">
            <label htmlFor="card-label">Email</label>
            <input type="email" className="card-input" required />
          </div>

          <div className="card-info">
            <label htmlFor="card-label">Password</label>
            <input type="password" className="card-input" required />
          </div>

          <a className="card-forgot">Forgotten Password?</a>

          <button type="submit" className="card-btn">
            Login
          </button>
        </form>

        <form
          className="card card-back"
          name="signup-card"
          onSubmit={SubmitSignup}
        >
          <h1 className="card-header">Sign up</h1>
          <div className="card-info">
            <label htmlFor="card-label">Name</label>
            <input
              className="card-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="card-info">
            <label htmlFor="card-label">Email</label>
            <input
              className="card-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="card-info">
            <label htmlFor="card-label">Password</label>
            <input
              className="card-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
