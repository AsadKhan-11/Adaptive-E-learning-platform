import React from "react";
import "./Enroll.css";
import html2 from "../images/html2.jpg";
function Enroll() {
  return (
    <div className="enroll">
      <div className="enroll-container">
        <p className="enroll-desc">
          This course is designed to teach you how to create amazing websites
          from scratch using HTML. You will start by learning the basics of
          HTML, the language used to structure content on a webpage. You’ll
          discover how to create headings, paragraphs, lists, links, images, and
          more. By the end of this course, you’ll have a strong foundation in
          HTML and will be able to structure professional web pages with
          confidence!
        </p>

        <img src={html2} alt="enrollment image" className="enroll-img" />
      </div>
      <button className="enroll-btn">Enroll</button>
    </div>
  );
}

export default Enroll;
