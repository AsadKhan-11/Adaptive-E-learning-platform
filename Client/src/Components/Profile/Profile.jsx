import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", courses: "" });
  const [originalUser, setOriginalUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setOriginalUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!originalUser) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setUser(originalUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/profile",
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setOriginalUser(response.data);
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="profile">
      <form
        className="profile-form"
        name="profile-form"
        onSubmit={handleSubmit}
      >
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Name
          </label>
          <input
            className={isEditable ? "editable" : "disabled"}
            type="text"
            name="name"
            value={user.name}
            disabled={!isEditable}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />{" "}
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Email
          </label>

          <input
            className="disabled"
            disabled
            type="text"
            name="email"
            readOnly={!isEditable}
            value={user.email}
          />
        </div>

        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Courses
          </label>
          <input className="disabled" disabled type="text" name="active" />
        </div>

        {!isEditable ? (
          <button className="profile-change nav-sign-btn" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <div className="btns-container">
            <button
              className="profile-change nav-sign-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button className="profile-change nav-sign-btn" type="submit">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
