import React, { useState } from "react";
import "./Card.css";
import ReactCardFlip from "react-card-flip";

function Card({ isFlipped }) {
  return (
    <div className="Landing-card" id="landing-card">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <form id="card-form" name="card-form" className="card">
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

        <form className="card card-back">
          <h1 className="card-header">Sign up</h1>
          <div className="card-info">
            <label htmlFor="card-label">Name</label>
            <input className="card-input" type="text" required />
          </div>
          <div className="card-info">
            <label htmlFor="card-label">Email</label>
            <input className="card-input" type="email" required />
          </div>

          <div className="card-info">
            <label htmlFor="card-label">Password</label>
            <input className="card-input" type="password" required />
          </div>

          <div className="card-info">
            <label htmlFor="card-label">Phone Number</label>
            <input className="card-input" type="tel" required />
          </div>

          <button type="submit" className="card-btn">
            Sign up
          </button>
        </form>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
