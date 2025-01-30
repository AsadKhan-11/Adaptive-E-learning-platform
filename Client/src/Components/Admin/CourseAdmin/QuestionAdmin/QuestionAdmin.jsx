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
  const [showModal, setShowModal] = useState(false);
  const { setIsLoading } = useLoader();
  const [formData, setFormData] = useState({
    title: "",
    answer: "",
    options: ["", "", "", ""],
    videoLinks: ["", "", ""],
  });

  const handleChange = (e, index, type) => {
    if (type === "options") {
      let updatedOptions = [...formData.options];
      updatedOptions[index] = e.target.value;
      setFormData({ ...formData, options: updatedOptions });
    } else if (type === "videoLinks") {
      let updatedVideos = [...formData.videoLinks];
      updatedVideos[index] = e.target.value;
      setFormData({ ...formData, videoLinks: updatedVideos });
    } else {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.name === "difficulty"
            ? Number(e.target.value)
            : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const validVideoLinks = formData.videoLinks.filter(
        (link) => link.trim() !== ""
      );

      // Send question data to backend
      const response = await axios.post(
        `https://complex-giant-need.glitch.me/api/add-questions/${courseId}`,
        {
          text: formData.title,
          answer: formData.answer,
          options: formData.options,
          helpVideo: validVideoLinks,
          difficulty: formData.difficulty,
        }
      );

      console.log("Question added:", response.data);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://complex-giant-need.glitch.me/api/${courseId}/getQuestions`,
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

  const toggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="admin-question">
      <h2 className="admin-header">Course Questions</h2>
      <div className="admin-wrapper">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q._id} className="questions-container ">
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
      <button className="add-question" onClick={toggle}>
        Add +
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="question-modal-content">
            <h2>Add New Question</h2>
            <form
              onSubmit={handleSubmit}
              className="question-modal-form"
              name="myForm"
            >
              {/* Question Title */}
              <div className="form-group">
                <label>Question Title</label>
                <input
                  type="text"
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Question"
                />
              </div>

              {/* Answer */}
              <div className="form-group">
                <label>Correct Answer</label>
                <input
                  type="text"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  placeholder="Correct Answer"
                  required
                />
              </div>

              {/* Options */}
              <div className="form-group">
                <label>Options</label>
                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleChange(e, index, "options")}
                    required
                  />
                ))}
              </div>

              {/* Video Links */}
              <div className="form-group">
                <label>Video Links</label>
                {formData.videoLinks.map((link, index) => (
                  <input
                    key={index}
                    type="url"
                    placeholder={`Video Link ${index + 1}`}
                    value={link}
                    onChange={(e) => handleChange(e, index, "videoLinks")}
                  />
                ))}
              </div>
              <div className="form-group">
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Difficulty</option>
                  <option value="1">Easy (1)</option>
                  <option value="2">Medium (2)</option>
                  <option value="3">Hard (3)</option>
                </select>
              </div>
              <button className="remove-button" onClick={toggle}>
                x
              </button>
            </form>
            <button type="submit">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAdmin;
