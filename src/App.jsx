import { useState } from "react";
import Login from "./Components/Landing/Login";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Components/LandingPage/Landing";
import Sidebar from "./Components/Sidebar/Sidebar";
import Course from "./Components/Course/Course";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [navText, setNavText] = useState("Signup");

  const handleNavClick = () => {
    setIsFlipped(!isFlipped);
    setNavText(isFlipped ? "Signup" : "Login");
  };

  return (
    <div className="App">
      <Navbar navText={navText} handleNavClick={handleNavClick} />

      {/* <Landing />  */}
      {/* <Login isFlipped={isFlipped} /> */}
      <div className="app-container">
        <Sidebar />
        <Course />
      </div>
    </div>
  );
}

export default App;
