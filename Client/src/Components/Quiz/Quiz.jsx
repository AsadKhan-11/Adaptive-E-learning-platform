import React, { useEffect } from "react";
import "./Quiz.css";
import axios from "axios";
function Quiz() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const fetchNextQuestion = async (courseId) => {
    try {
      const response = await axios.get(`/api/quiz/${courseId}`);
      setQuestion(response.data.questions);
    } catch (error) {
      console.error("Error fetching the next question:", error);
      return null;
    }
  };
  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const handleAnswerSubmit = async () => {
    console.log("Answer submitted:", selectedOption);
    const nextQuestion = await fetchNextQuestion();
    setQuestion(nextQuestion?.questions[0]);
  };

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
  );
}

export default Quiz;
