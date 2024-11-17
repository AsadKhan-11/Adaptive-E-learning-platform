import React from "react";
import RingLoader from "react-spinners/RingLoader";
import "./Loader.css";
function Loader() {
  return (
    <div className="loader">
      <RingLoader color="#007bff" size={150} />
    </div>
  );
}

export default Loader;
