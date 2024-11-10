import { useEffect, useState } from "react";
import Login from "./Components/Landing/Login";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Course from "./Components/Course/Course";
import Question from "./Components/Questiom/Question";
import Level from "./Components/Course/Level/Level";
import Profile from "./Components/Profile/Profile";
import Dashboard from "./Components/Dashboard/Dashboard";
import Select from "./Components/Course/Level/Select/Select";
import Videos from "./Components/Course/Level/Select/Videos/Videos";
import Quiz from "./Components/Course/Level/Select/Quiz/Quiz";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navText, setNavText] = useState("Signup");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setNavText(token ? "Logout" : "Signup");
  }, []);

  const handleNavClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      setNavText("Signup");
      setIsFlipped(false);
      window.location.href = "/";
    } else {
      setIsFlipped(!isFlipped);
      setNavText(isFlipped ? "Signup" : "Login");
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar navText={navText} handleNavClick={handleNavClick} />
        <Routes>
          <Route path="/" element={<Login isFlipped={isFlipped} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course"
            element={
              <ProtectedRoute>
                <Layout>
                  {" "}
                  <Course />{" "}
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  {" "}
                  <Profile />{" "}
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/question"
            element={
              <ProtectedRoute>
                <Layout>
                  <Question />{" "}
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
