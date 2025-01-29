import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setIsLoading } = useLoader();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
