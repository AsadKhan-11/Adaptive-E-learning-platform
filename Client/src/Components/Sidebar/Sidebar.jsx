import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  const highlightLink = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li
          className={`icon-tag ${activeLink === "dashboard" ? "active" : ""}`}
          onClick={() => highlightLink("dashboard")}
        >
          <Link to="/dashboard" className="links">
            <ion-icon name="home-outline" className="side-icon"></ion-icon>
            Dashboard
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "course" ? "active" : ""}`}
          onClick={() => highlightLink("course")}
        >
          <Link to="/course" className="links">
            <ion-icon name="book-outline" className="side-icon"></ion-icon>
            Courses
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "question" ? "active" : ""}`}
          onClick={() => highlightLink("question")}
        >
          <Link to="/question" className="links">
            <ion-icon
              name="chatbubbles-outline"
              className="side-icon"
            ></ion-icon>
            Ask a Question
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "profile" ? "active" : ""}`}
          onClick={() => highlightLink("profile")}
        >
          <Link to="/profile" className="links">
            <ion-icon name="person-outline" className="side-icon"></ion-icon>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
