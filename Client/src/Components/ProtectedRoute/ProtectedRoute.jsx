import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useLoader } from "../../Context/LoaderContext";

const ProtectedRoute = ({ role, children }) => {
  const { setIsLoading } = useLoader();
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [token]);

  if (!token) return <Navigate to="/" replace />;

  return children;
};
export default ProtectedRoute;
