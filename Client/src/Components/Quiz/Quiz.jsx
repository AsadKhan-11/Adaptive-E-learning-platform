import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../Context/LoaderContext";

function Quiz() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [message, setMessage] = useState(false);
  const { setIsLoading } = useLoader();
  const [isCorrect, setIsCorrect] = useState(null);
  const [err, setErr] = useState(null);

  const token = localStorage.getItem("token");
  const { courseId } = useParams();
  const isFetched = useRef(false); // Ref to prevent duplicate calls
  const navigate = useNavigate();
  const fetchNextQuestion = useCallback(async () => {
    isFetched.current = true;
    setIsAnswered(true);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/quiz/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestion(response.data);
    } catch (error) {
      alert(error.response.data.message);
      navigate("/dashboard");
      console.error("Error fetching the next question:", error);
    } finally {
      setIsLoading(false);
      setIsAnswered(false);
    }
  });

  const handleSubmit = () => {
    if (selectedOption) {
      handleAnswerSubmit(selectedOption);
    } else {
      setErr(true);
      setMessage("Please select an option before submitting.");
      setTimeout(() => {
        setMessage("");
        setIsCorrect(null);
        setErr(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchNextQuestion();
  }, [setIsLoading]);

  const handleAnswerSubmit = async (selectedAnswer) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/quiz/${courseId}/submit-answer`,
        {
          questionId: question._id,
          answer: selectedAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { isCorrect, nextQuestion, correctAnswer } = response.data;
      if (isCorrect) {
        setErr(false);
        setMessage("Correct Answer 🎉");
      } else {
        setErr(true);
        setMessage(`The correct answer is ${correctAnswer}`);
      }

      setTimeout(() => {
        setMessage(""); // Clear the message after displaying it
        setIsCorrect(null);
        if (nextQuestion) {
          setQuestion(nextQuestion);
        } else {
          alert("No more questions available!");
        }
      }, 3000);
    } catch (error) {
      alert(error.response.data.message);
      navigate("/dashboard");

      console.error("Error submitting the answer:", error);
    }
  };

  return (
    <div className="quiz">
      {question && (
        <div>
          <div className="quiz-wrapper">
            <div className="quiz-container">
              <h3 className="quiz-question">{question.text}?</h3>
              <ul className="quiz-detail">
                {question.options.map((options, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedOption(options)}
                    className={`quiz-opt ${
                      selectedOption === options ? "highlighted" : ""
                    }`}
                  >
                    {options}
                  </li>
                ))}
              </ul>

              <button
                type="submit"
                className="nav-sign-btn quiz-btn"
                onClick={handleSubmit}
                disabled={isAnswered}
              >
                Submit
              </button>
              <p className={`message ${err ? "error" : "success"}`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
