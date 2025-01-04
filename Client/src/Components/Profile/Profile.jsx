import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [courses, setCourses] = useState({ courses: "" });

  const [originalUser, setOriginalUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        setUser(response.data.user);
        setCourses(response.data.courses);
        setOriginalUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };

    fetchUserData();
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
    const token = localStorage.getItem("token");
    const payload = { name: user.name };
    e.preventDefault();
    if (!user.name) {
      console.error("Name is required");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/profile",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      setOriginalUser(response.data);
      setIsEditable(false);
      console.log("Error updating user data:", response);
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
              setUser({ ...user, name: e.target.value });
            }}
          />{" "}
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Email
          </label>

          <p className="disabled">{user.email}</p>
        </div>

        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Courses
          </label>
          <div className="courses-container">
            {" "}
            {Array.isArray(courses) ? (
              courses.map((courses, index) => (
                <p className="disabled" key={index}>
                  {courses.title}
                </p>
              ))
            ) : (
              <p className="disabled">No user data available</p>
            )}
          </div>
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
