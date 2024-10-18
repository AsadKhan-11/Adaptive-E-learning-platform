import { useState } from "react";
import Login from "./Components/Landing/Login";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Components/LandingPage/Landing";
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

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navText, setNavText] = useState("Signup");

  const handleNavClick = () => {
    setIsFlipped(!isFlipped);
    setNavText(isFlipped ? "Signup" : "Login");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar navText={navText} handleNavClick={handleNavClick} />
        <Routes>
          <Route path="/" element={<Login isFlipped={isFlipped} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
