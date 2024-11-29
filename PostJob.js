import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { api } from "./Main";
const PostJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState({
    title: "",
    description: "",
    id: generateUniqueId(),
    email: location.state.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  async function generateUniqueId() {
    try {
      // Fetch existing IDs from the database
      const response = await fetch(`${api}/jobs`);
      const existingIds = response.data; // Assuming the API returns an array of IDs

      let newId;
      do {
        // Generate a random ID
        newId = Math.floor(Math.random() * 10); // Adjust range as needed
      } while (existingIds.includes(newId)); // Check if the ID already exists

      return newId;
    } catch (error) {
      console.error("Error fetching IDs:", error);
      throw new Error("Unable to generate unique ID");
    }
  }
  const handleSubmit = () => {
    fetch(`${api}/post-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    }).then(() => {
      console.log(typeof job);

      navigate("/JobsDashboard");
    });
  };

  return (
    <div>
      <h1>Post a Job</h1>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PostJob;
