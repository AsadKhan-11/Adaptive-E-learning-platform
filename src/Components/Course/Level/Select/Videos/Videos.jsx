import React from "react";
import "./Videos.css";
import video1 from "./Videos/Video1.mp4";
import video2 from "./Videos/Video2.mp4";
import video3 from "./Videos/Video3.mp4";
function Videos() {
  return (
    <div className="videos">
      <h1 className="video-header">Videos</h1>
      <div className="video-wrapper">
        <div className="video-container">
          {/* <h1 className="video-detail">What is float</h1> */}
          <video width="280" height="240" controls src={video1}></video>
        </div>
        <div className="video-container">
          {/* <h1 className="video-detail">What are grids </h1> */}
          <video width="280" height="240" controls src={video2}></video>
        </div>
        <div className="video-container">
          {/* <h1 className="video-detail">How to use flexbox </h1> */}
          <video width="280" height="240" controls src={video3}></video>
        </div>
      </div>
    </div>
  );
}

export default Videos;
