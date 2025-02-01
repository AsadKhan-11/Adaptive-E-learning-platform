import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useLoader } from "../../Context/LoaderContext";
import Config from "../../Config/Config";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Quiz() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [message, setMessage] = useState(false);
  const { setIsLoading } = useLoader();
  const [isCorrect, setIsCorrect] = useState(null);
  const [err, setErr] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const token = localStorage.getItem("token");
  const { courseId } = useParams();
  const isFetched = useRef(false); // Ref to prevent duplicate calls
  const navigate = useNavigate();
  const prevDifficulty = useRef(null); // Keep track of previous difficulty

  const fetchNextQuestion = useCallback(async () => {
    isFetched.current = true;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${Config.API_URL}/api/quiz/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setQuestion(response.data);
      const newDifficulty = response.data.difficulty;
      if (newDifficulty !== prevDifficulty.current) {
        prevDifficulty.current = newDifficulty; // Update the previous difficulty
        setCurrentDifficulty(newDifficulty); // Update the state with the new difficulty

        // Show the toast only if the difficulty has changed
        toast.success(`Difficulty level has changed to ${newDifficulty}!`, {});
      }
    } catch (error) {
      if (!isFetched.current) return;
      alert("No questions available at the moment");
      navigate("/course");
      console.error("Error fetching the next question:", error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleSubmit = async () => {
    if (!selectedOption) {
      setErr(true);
      setMessage("Please select an option before submitting.");
      setTimeout(() => {
        setMessage("");
        setErr(false);
      }, 3000);
      return;
    }

    setIsAnswered(true);

    try {
      await handleAnswerSubmit(selectedOption);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsAnswered(false);
    }
  };
  useEffect(() => {
    const fetchCurrentDifficulty = async () => {
      try {
        const response = await axios.get(
          `${Config.API_URL}/api/course/difficulty/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentDifficulty(response.data.difficulty);
      } catch (error) {
        console.error("Error fetching current difficulty:", error);
      }
    };
    fetchCurrentDifficulty();
    if (currentDifficulty !== prevDifficulty.current) {
      prevDifficulty.current = currentDifficulty; // Update ref after state change
      toast.success(
        `Difficulty level has changed to ${currentDifficulty}!`,
        {}
      );
    }
    fetchNextQuestion();
  }, [setIsLoading, courseId]);

  const handleAnswerSubmit = async (selectedAnswer) => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/api/quiz/${courseId}/submit-answer`,
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
        setMessage("");
        toast.success("Correct Answer 🎉");
      } else {
        toast.success("Keep it up");
        setErr(true);
        toast.error(`The correct answer is: ${correctAnswer}`);
      }

      setTimeout(() => {
        setMessage(""); // Clear the message after displaying it
        setIsCorrect(null);
        if (nextQuestion) {
          setQuestion(nextQuestion);
        } else {
          toast.error(`No more questions available at the moment`);
        }
      }, 3000);
    } catch (error) {
      alert(error.response.data.message);
      navigate("/dashboard");

      console.error("Error submitting the answer:", error);
    } finally {
      setSelectedOption(null);
    }
  };

  const toggleHelpModal = () => {
    setShowModal(!showModal);
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
                className={`nav-sign-btn quiz-btn ${
                  isAnswered ? "disabled-btn" : ""
                }`}
                onClick={handleSubmit}
                disabled={isAnswered}
              >
                Submit
              </button>
              <p className={`message ${err ? "error" : "success"}`}>
                {message}
              </p>
              <p className="help-btn" onClick={toggleHelpModal}>
                Need Help?
              </p>
            </div>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h4>Need Help?</h4>
                {question.helpVideo && question.helpVideo.length > 0 ? (
                  <>
                    <p>Here are some videos for your help:</p>
                    {question.helpVideo.map((video, index) => (
                      <div key={index}>
                        <h4 className="videos-label">Link {index + 1}</h4>
                        <a
                          href={video}
                          target="_blank"
                          className="quiz-videos"
                          rel="noopener noreferrer"
                        >
                          {video}
                        </a>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {console.log(question)}
                    <p>No videos available at the moment.</p>
                  </>
                )}
                <button onClick={toggleHelpModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Quiz;
