import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useLoader } from "../../Context/LoaderContext";

const ProtectedRoute = ({ role, children }) => {
  const { setIsLoading } = useLoader();
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, [token, setIsLoading, setUser]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;
