import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "./App";

import { UserContext } from './userContext';
const JobsDashboard =  () => {
  const [Jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  
  const { email } = useContext(UserContext);

  useEffect(
   () => {
    
     
     
  
    
      

 
    
   

    
     
    

   
  




   
  
  
  
  
    
    
     
  




 

 
  
 

  
 
    
     

    
       
       

       

      
      
      

    
     


  
        









  fetch(`${api}/jobs-dashboard/${email}`).then((res)=>res.json()).then((data) => setJobs(data));
},[]);
  const handlePostJob = () => {
    navigate("/PostJob");
  };
  const handleMatchedProfiles = () => {
    navigate("/MatchedProfiles", { state: { Jobs } });
  };
  const closeJob = async (jobId) => {
    const updatedRows = Jobs.filter((job) => job._id != jobId);
    setJobs([updatedRows]);
    await fetch(`${api}/delete/${jobId}`, { method: "DELETE" }).then(() =>
      alert("job successfully deleted ")
    );
  };
  return (
    <div>
      <h1>Jobs Dashboard</h1>
      <button onClick={handlePostJob}>Post Job</button>
      <button onClick={handleMatchedProfiles}>Matched Profiles</button>
      <table border="1">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Matching Profiles</th>
          </tr>
        </thead>
        <tbody id="t-body">
          {Jobs.map((job) => {
            <tr key={job._id}>
              <td>{job._id}</td>
              <td>{job.jobTitle}</td>
              <td>
                <button onClick={() => closeJob(job._id)}>Close</button>
              </td>
           
              
                
                  
                  
           
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobsDashboard;
