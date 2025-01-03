import React, { useEffect, useState } from "react";
import "./Layout.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
function Layout({ children }) {
  return (
    <div className="Layout">
      <Sidebar />
      <div className="main-content"> {children}</div>
    </div>
  );
}

export default Layout;
