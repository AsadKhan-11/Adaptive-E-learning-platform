import React from "react";
import "./Sidebar.css";
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
      <a href="#" className="icon-tag active" onClick={highlightLink}>
        <ion-icon name="home-outline" className="side-icon"></ion-icon>{" "}
        Dashboard
      </a>
      <a href="#" className="icon-tag " onClick={highlightLink}>
        <ion-icon name="book-outline" className="side-icon"></ion-icon>
        Courses
      </a>
      <a href="#" className="icon-tag" onClick={highlightLink}>
        <ion-icon name="chatbubbles-outline" className="side-icon"></ion-icon>
        Ask a Question
      </a>
      <a href="#" className="icon-tag" onClick={highlightLink}>
        {" "}
        <ion-icon name="person-outline" className="side-icon"></ion-icon>
        Profile
      </a>
    </div>
  );
}

export default Sidebar;
