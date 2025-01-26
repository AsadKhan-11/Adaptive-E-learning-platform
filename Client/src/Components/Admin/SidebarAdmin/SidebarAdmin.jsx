import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <Link to="/admin-dashboard" className="links">
            <ion-icon name="home-outline" className="side-icon"></ion-icon>
            Dashboard fvlkdfv
          </Link>
        </li>

        <li
          className={`icon-tag ${activeLink === "course" ? "active" : ""}`}
          onClick={() => highlightLink("course")}
        >
          <Link to="/students" className="links">
            <ion-icon name="book-outline" className="side-icon"></ion-icon>
            Students{" "}
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
          <Link to="/admin-profile" className="links">
            <ion-icon name="person-outline" className="side-icon"></ion-icon>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
