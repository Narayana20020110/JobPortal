import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./App";
const JobListingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs data from backend
    fetch(`${api}/jobs`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        
      });
  }, []);

  const handleApply = (jobId) => {
    // Navigate to SubmitProfile with the job ID
    navigate("/SubmitProfile", { state: { jobId } });
  };

  return (
    <div>
      <h1>Jobs Listing Dashboard</h1>
      <div>
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{ border: "1px solid black", margin: "10px" }}
          >
            <h2>{job.jobTitle}</h2>
            <p>{job.description}</p>
            <button onClick={() => handleApply(job._id)}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingDashboard;
