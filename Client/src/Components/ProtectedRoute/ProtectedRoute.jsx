import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useLoader } from "../../Context/LoaderContext";

const ProtectedRoute = ({ role, children }) => {
  const { setIsLoading } = useLoader();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
