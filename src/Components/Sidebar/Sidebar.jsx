import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
function Sidebar() {
  function highlightLink(event) {
    event.preventDefault();

    const links = document.querySelectorAll(".icon-tag");
    links.forEach((link) => {
      link.classList.remove("active");
    });

    event.target.classList.add("active");
  }

  return (
    <div className="sidebar">
      <Link to="/dashboard" className="icon-tag active" onClick={highlightLink}>
        <ion-icon name="home-outline" className="side-icon"></ion-icon>{" "}
        Dashboard
      </Link>
      <Link to="/courses" className="icon-tag " onClick={highlightLink}>
        <ion-icon name="book-outline" className="side-icon"></ion-icon>
        Courses
      </Link>
      <Link to="/question" className="icon-tag" onClick={highlightLink}>
        <ion-icon name="chatbubbles-outline" className="side-icon"></ion-icon>
        Ask a Question
      </Link>
      <Link to="/profile" className="icon-tag" onClick={highlightLink}>
        {" "}
        <ion-icon name="person-outline" className="side-icon"></ion-icon>
        Profile
      </Link>
    </div>
  );
}

export default Sidebar;
