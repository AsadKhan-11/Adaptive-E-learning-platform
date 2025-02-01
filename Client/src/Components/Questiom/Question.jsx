import React, { useState } from "react";
import "./Question.css";
import axios from "axios";
import { useLoader } from "../../Context/LoaderContext";
import Config from "../../Config/Config";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Question() {
  const [message, setmessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { setIsLoading } = useLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${Config.API_URL}/email/send`, {
        email: user.user.email,
        user: user.user.name,
        message: message,
      });
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
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

        <button type="submit" className="nav-sign-btn profile-change">
          Send
        </button>
        <ToastContainer />
      </div>
    </form>
  );
}

export default Question;
