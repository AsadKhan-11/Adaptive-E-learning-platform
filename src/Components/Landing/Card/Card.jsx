import React, { useState } from "react";
import "./Card.css";
import ReactCardFlip from "react-card-flip";

function Card() {
  const [isFlipped, SetIsFlipped] = useState(false);

  function Flipped() {
    SetIsFlipped(!isFlipped);
  }

  return (
    <div className="Landing-card">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className="card" onClick={Flipped}>
          <label htmlFor="">Name</label>
          <input className="card-input" />

          <label htmlFor="">Password</label>
          <input className="card-input" />
        </div>

        <div className="card card-back" onClick={Flipped}>
          <label htmlFor="">Name</label>
          <input className="card-input" />

          <label htmlFor="">Password</label>
          <input className="card-input" />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
