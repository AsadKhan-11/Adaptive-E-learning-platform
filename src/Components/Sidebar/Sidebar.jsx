import React from "react";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#" className="icon-tag">
        {" "}
        <ion-icon name="home-outline" className="side-icon"></ion-icon>{" "}
        Dashboard
      </a>
      <a href="#" className="icon-tag">
        {" "}
        <ion-icon name="videocam-outline" className="side-icon"></ion-icon>
        Videos
      </a>
      <a href="#" className="icon-tag">
        <ion-icon name="book-outline" className="side-icon"></ion-icon>
        Quiz
      </a>
      <a href="#" className="icon-tag">
        <ion-icon name="chatbubbles-outline" className="side-icon"></ion-icon>
        Ask a Question
      </a>
    </div>
  );
}

export default Sidebar;
