import React, { useEffect, useState } from "react";
import "./Layout.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
function Layout({ children }) {
  const [loader, setLoader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="Layout">
      <Sidebar />
      <div className="main-content"> {loader ? <Loader /> : children}</div>
    </div>
  );
}

export default Layout;
