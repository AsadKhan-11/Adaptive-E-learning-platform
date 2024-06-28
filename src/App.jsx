import { useState } from "react";
import Landing from "./Components/Landing/landing";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Landing />
    </>
  );
}

export default App;
