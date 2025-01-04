import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../Api/AuthApi";

const VerificationPage = () => {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // Get email from navigation state

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/verify-email", { email, code });
      alert(response.data.message);

      // Redirect to the login page on successful verification
      navigate("/login");
    } catch (error) {
      alert("Verification failed: " + error.response.data.message);
    }
  };

  if (!email) {
    return <p>Error: Email not found. Please sign up again.</p>;
  }

  return (
    <form onSubmit={handleVerify}>
      <p>Verification code sent to: {email}</p>
      <label>Enter Code:</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerificationPage;
