import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {api} from "./Main";
const SubmitProfile = () => {
  const location = useLocation();
  const jobId = location.state.jobId;
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    experience: "",
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
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills"
        value={profile.skills}
        onChange={handleChange}
      />
      <input
        type="number"
        name="experience"
        placeholder="Experience"
        value={profile.experience}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitProfile;
