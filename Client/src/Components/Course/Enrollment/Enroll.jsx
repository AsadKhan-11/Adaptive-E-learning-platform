import React from "react";
import "./Enroll.css";
import img from "../../../assets/Background.jpg";

function Enroll() {
  return (
    <div className="enroll">
      <div className="enroll-container">
        <p className="enroll-desc">
          This course is designed to teach you how to create amazing websites
          from scratch. You will start by learning HTML, the language used to
          structure content on a webpage. Then, you’ll move on to CSS, which is
          used to style your websites and make them look beautiful with colors,
          layouts, and designs. Finally, you’ll dive into JavaScript, the
          language that adds interactivity to your websites, like buttons that
          respond when clicked or animations that make your site engaging. By
          the end of this course, you’ll be able to build your own professional
          websites!
        </p>

        <img src={img} alt="enrollment image" className="enroll-img" />
      </div>
      <button className="enroll-btn">Enroll</button>
    </div>
  );
}

export default Enroll;
