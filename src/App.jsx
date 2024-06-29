import { useState } from "react";
import Landing from "./Components/Landing/landing";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
