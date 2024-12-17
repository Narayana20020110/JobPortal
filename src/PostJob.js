import React, { useState , useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {UserContext }from "./userContext";
import { api } from "./App";
const PostJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState({
    jobTitle: "",
    description: "",
  
    email: useContext(UserContext),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };



 


  
   
      

 

   
 
     
    
    
  
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
        value={job.jobTitle}
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
