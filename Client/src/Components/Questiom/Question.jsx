import React, { useState } from "react";
import "./Question.css";
import axios from "axios";
import { useLoader } from "../../Context/LoaderContext";
function Question() {
  const [message, setmessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { setIsLoading } = useLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/email/send", {
        email: user.user.email,
        user: user.user.name,
        message: message,
      });
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="question" onSubmit={handleSubmit}>
      <h1 className="question-header">Send us a Question</h1>
      <div className="question-container">
        <textarea
          type="textarea"
          className="question-txt"
          rows="4"
          cols="50"
          placeholder="Enter you questions here..."
          name="question"
          required
          value={message}
          onChange={(e) => {
            setmessage(e.target.value);
          }}
        ></textarea>

        <button type="submit" className="nav-sign-btn">
          Send
        </button>
      </div>
    </form>
  );
}

export default Question;
