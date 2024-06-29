import React from "react";
import "./landing.css";
import "./Card/Card";
import Card from "./Card/Card";
function landing() {
  return (
    <div className="Landing-page">
      <h1 className="landing-header">
        Unlock Your Potential with Personalized AI Learning
      </h1>
      {/* <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div> */}
      <Card />
    </div>
  );
}

export default landing;
