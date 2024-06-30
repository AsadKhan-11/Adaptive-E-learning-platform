import React from "react";
import "./Landing.css";
import Background from "../../assets/Background.jpg";
import Typewriter from "typewriter-effect";

function Landing() {
  return (
    <div className="Landing">
      <h1 className="Landing-header ">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            strings: [
              "Best Online Learning Platform ",
              "Smart Learning for the Digital Age",
            ],
          }}
          onInit={(typewriter) => {
            typewriter
              .pauseFor(2500)
              .deleteAll()

              .start();
          }}
        />
      </h1>
    </div>
  );
}

export default Landing;
