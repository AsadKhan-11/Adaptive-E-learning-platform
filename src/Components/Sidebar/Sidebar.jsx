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
          <ion-icon name="home-outline" className="side-icon"></ion-icon>
          <Link to="/dashboard" className="links">
            Dashboard
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "course" ? "active" : ""}`}
          onClick={() => highlightLink("course")}
        >
          <ion-icon name="book-outline" className="side-icon"></ion-icon>
          <Link to="/course" className="links">
            Courses
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "question" ? "active" : ""}`}
          onClick={() => highlightLink("question")}
        >
          <ion-icon name="chatbubbles-outline" className="side-icon"></ion-icon>
          <Link to="/question" className="links">
            Ask a Question
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "profile" ? "active" : ""}`}
          onClick={() => highlightLink("profile")}
        >
          <ion-icon name="person-outline" className="side-icon"></ion-icon>
          <Link to="/profile" className="links">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
