import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Verification.css";
import axios from "../../../Api/AuthApi";
import Config from "../../../Config/Config";

const Verification = ({
  setNavText,
  setIsFlipped,
  email,
  name,
  password,
  setIsVerification,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKey = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    const verificateCode = code.join("");
    e.preventDefault();
    try {
      const response = await axios.post(`${Config.API_URL}/auth/signup`, {
        email,
        name,
        password,
        code: verificateCode,
      });
      alert(response.data.message);

      setNavText("Signup");
      setIsFlipped(false);
      setIsVerification(false);
    } catch (error) {
      alert("Verification failed: " + error.response.data.message);
      setNavText("Signup");
      setIsFlipped(false);
      setIsVerification(false);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleVerify(new Event("submit"));
    }
  }, [code]);

  if (!email) {
    return <p>Error: Email not found. Please sign up again.</p>;
  }

  return (
    <form onSubmit={handleVerify} className="verify">
      <h3 className="verify-txt">Verify Your Email</h3>
      <div className="verify-container">
        {code.map((digit, index) => (
          <input
            className="verify-code"
            key={index}
            type="text"
            ref={(el) => (inputRefs.current[index] = el)}
            max={6}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKey(index, e)}
            required
          />
        ))}
      </div>
      <button type="submit" className="verify-btn">
        Verify
      </button>
    </form>
  );
};

export default Verification;
