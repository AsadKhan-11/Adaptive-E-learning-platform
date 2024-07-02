import React from "react";
import "./Profile.css";
function Profile() {
  return (
    <div className="profile">
      <form className="profile-form" name="profile-form">
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Name
          </label>
          <h3 className="profile-input">Asad Ahmed Khan</h3>
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Email
          </label>

          <h3 className="profile-input">ak4786083@gmail.com</h3>
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Phone
          </label>
          <h3 className="profile-input">03104388534</h3>
        </div>
        <div className="profile-info">
          <label htmlFor="" className="profile-label">
            Active Courses
          </label>
          <h3 className="profile-input">1</h3>
        </div>
      </form>
    </div>
  );
}

export default Profile;
