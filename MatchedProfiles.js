import React, { useState, useEffect } from "react";
import { api } from "./Main";
import {useLocation} from "react-router-dom";
import JobsDashboard from "./JobsDashboard";
const MatchedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
 const location = useLocation();
  useEffect(() => {
    const {jobs} = location.state.Jobs;
    // Fetch matched profiles data from backend
    setInterval(() => {
      Object.keys(jobs).map((job) => {
        fetch(`${api}/matched/${job.id}`)
          .then((response) => response.json())
          .then((data) => setProfiles(data));
      });
     
    }, 5000);
  }, []);

  return (
    <div>
      <h1>Matched Profiles</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={index}>
              <td>{profile.userName}</td>
              <td>{profile.email}</td>
              <td>{profile.resume}</td>
              <td>
                <button>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <JobsDashboard profiles />
    </div>
  );
};

export default MatchedProfiles;
