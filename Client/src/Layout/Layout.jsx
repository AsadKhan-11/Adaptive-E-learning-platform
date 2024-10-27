import React from "react";
import "./Layout.css";
import Sidebar from "../Components/Sidebar/Sidebar";
function Layout({ children }) {
  return (
    <div className="Layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;
