import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../../Context/LoaderContext";

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [courses, setCourses] = useState([]);
  const { setIsLoading } = useLoader();

  const [originalUser, setOriginalUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://complex-giant-need.glitch.me/api/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
        setCourses(response.data.courses);
        setOriginalUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, setIsLoading]);

  if (!originalUser) {
    setIsLoading(true);
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
        "https://complex-giant-need.glitch.me/api/profile",
        payload,
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
            required
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
            {courses.length > 0 ? (
              courses.some((course) => !course.title) ? (
                <p className="disabled">No courses</p>
              ) : (
                courses.map((course, index) => (
                  <span className="disabled" key={index}>
                    {course.title} {index < courses.length - 1 ? ", " : ""}
                  </span>
                ))
              )
            ) : (
              <p className="disabled">No courses enrolled</p>
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
              className="profile-change nav-sign-btn cancel"
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
