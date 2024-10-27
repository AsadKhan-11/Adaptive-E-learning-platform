import React, { useState } from "react";
import "./Profile.css";
function Profile() {
  const [formData, setFormData] = useState({
    name: "Asad Ahmed Khan",
    email: "ak4786083@gmail.com",
    phone: "03104388534",
    active: "1",
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditable(false);
  };

  return (
    <div className="profile">
      <form className="profile-form" name="profile-form" onSubmit={toggleEdit}>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Name
          </label>
          <input
            className={isEditable ? "editable" : "disabled"}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditable}
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
            onChange={handleChange}
            readOnly={!isEditable}
            value={formData.email}
          />
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Phone
          </label>
          <input
            className="disabled"
            disabled
            type="text"
            name="phone"
            onChange={handleChange}
            readOnly={!isEditable}
            value={formData.phone}
          />{" "}
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Courses
          </label>
          <input
            className="disabled"
            disabled
            type="text"
            name="active"
            value={formData.active}
          />
        </div>

        <div className="profile-btns">
          <button className="profile-change nav-sign-btn" onClick={toggleEdit}>
            {isEditable ? "Cancel" : "Edit"}
          </button>{" "}
          {isEditable && (
            <button
              className="profile-submit nav-sign-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
