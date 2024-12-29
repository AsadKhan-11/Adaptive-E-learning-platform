import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

function Quiz() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(null);

  const token = localStorage.getItem("token");
  const { courseId } = useParams();
  const isFetched = useRef(false); // Ref to prevent duplicate calls

  const fetchNextQuestion = async () => {
    setLoading(true);
    console.log("fetchNextQuestion called");
    if (isFetched.current) {
      console.log("Question already fetched, skipping...");
      return;
    }
    isFetched.current = true;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/quiz/${courseId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestion(response.data);
      console.log("here it is ", response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the next question:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const handleAnswerSubmit = async () => {
    if (!userAnswer) return;

    try {
      const response = await axios.post(`/api/quiz/submit-answer`, {
        courseId,
        questionId: question._id,
        userAnswer,
      });

      const isAnswerCorrect = response.data.isCorrect;
      setIsCorrect(isAnswerCorrect);
      setIsAnswered(true);
      fetchNextQuestion();
    } catch (error) {
      console.error("Error submitting the answer:", error);
    }
  };

  return (
    <div className="quiz">
      {loading && <Loader />}

      {!loading && question && (
        <div>
          <h1 className="quiz-header">Quiz</h1>
          <div className="quiz-wrapper">
            <div className="quiz-container">
              <h3 className="quiz-question">{question.text}?</h3>
              <ul className="quiz-detail">
                {question.options.map((options) => (
                  <li
                    key={options}
                    onClick={() => setUserAnswer(options)}
                    className="quiz-opt"
                  >
                    {options}
                  </li>
                ))}
              </ul>

              <button
                type="submit"
                className="nav-sign-btn quiz-btn"
                onClick={handleAnswerSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
