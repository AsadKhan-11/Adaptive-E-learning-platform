import React, { useEffect, useState } from "react";
import "./QuestionAdmin.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../../Context/LoaderContext";
import "./QuestionAdmin.css";

const QuestionAdmin = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");
  const { setIsLoading } = useLoader();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/${courseId}/getQuestions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="admin-question">
      <h2 className="text-center mb-4">Course Questions</h2>
      <div className="d-flex flex-column">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q._id} className="question-container \">
              <div className="question-card ">
                <div className="question-text">
                  <strong>{`Q${index + 1}:`}</strong> {q.text}
                </div>
                {q.options && q.options.length > 0 && (
                  <div className="answer-text">
                    <strong>Answer:</strong> {q.answer}{" "}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionAdmin;
