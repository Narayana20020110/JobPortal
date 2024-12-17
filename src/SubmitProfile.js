import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "./App";
const SubmitProfile = () => {
  const location = useLocation();
  const jobId = location.state.jobId;
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    userName: "",
    resume: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = () => {
    // Submit profile to the backend
    fetch(`${api}/job/${jobId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }).then(() => {
      alert("Application Submitted ");
      navigate("/JobListingDashboard");
    });
  };

  return (
    <div>
      <h1>Submit Profile</h1>
      <input
        type="text"
        name="userName"
        placeholder="userNme"
        value={profile.userName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="resume"
        placeholder="resume"
        value={profile.resume}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        value={profile.email}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitProfile;
