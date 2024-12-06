import React from "react";
import "./Quiz.css";
function Quiz() {
  return (
    <div className="quiz">
      <h1 className="quiz-header">Quiz</h1>
      <div className="quiz-wrapper">
        <div className="quiz-container">
          <h3 className="quiz-question">What is flexbox used for?</h3>
          <div className="quiz-detail">
            <input type="radio" />
            <p className="quiz-answer">To create 3D animations</p>
          </div>
          <div className="quiz-detail">
            <input type="radio" />
            <p className="quiz-answer">To style text and fonts</p>
          </div>
          <div className="quiz-detail">
            <input type="radio" />
            <p className="quiz-answer">
              To layout and align items in a container
            </p>
          </div>
          <div className="quiz-detail">
            <input type="radio" />
            <p className="quiz-answer">To add background images</p>
          </div>
          <button type="submit" className="nav-sign-btn quiz-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
