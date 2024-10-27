import React from "react";
import "./Question.css";
function Question() {
  return (
    <div className="question">
      <h1 className="question-header">Send us a Question</h1>
      <div className="question-container">
        <textarea
          type="textarea"
          className="question-txt"
          rows="4"
          cols="50"
          placeholder="Enter you questions here..."
          name="question"
        ></textarea>

        <button type="submit" className="nav-sign-btn">
          Send
        </button>
      </div>
    </div>
  );
}

export default Question;
