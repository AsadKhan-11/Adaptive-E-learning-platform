import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setIsLoading } = useLoader();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
