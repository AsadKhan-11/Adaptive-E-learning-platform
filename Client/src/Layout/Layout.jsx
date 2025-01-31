import React, { useContext, useEffect, useState } from "react";
import "./Layout.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import SidebarAdmin from "../Components/Admin/SidebarAdmin/SidebarAdmin";
import { UserContext, UserProvider } from "../Context/UserContext";

function Layout({ children }) {
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Layout">
      {user.role === "admin" ? <SidebarAdmin /> : <Sidebar />}
      <div className="main-content"> {children}</div>
    </div>
  );
}

export default Layout;
