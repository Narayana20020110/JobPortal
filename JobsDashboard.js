import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "./Main";
const JobsDashboard = async (profiles) => {
  const [Jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const tableBodyRef = useRef(null);
  const { email } = location.state.email;

  /*useEffect(
    () => {
      if (location.state && location.state.job) {
        //  const { job } = location.state;
        console.log(location.state);
        setJobs((preJobs) => [...preJobs, location.state.job]);
        console.log(Jobs);
      }

      /* const addJobToTable = (job) => {
      console.log(job);
      const newRow = document.createElement("tr");

      // Create table cells for job properties
      const idCell = document.createElement("td");
      idCell.textContent = job.id;

      const titleCell = document.createElement("td");
      titleCell.textContent = job.title;

      const statusCell = document.createElement("td");
      statusCell.textContent = job.status;

      // Append cells to the new row
      newRow.appendChild(idCell);
      newRow.appendChild(titleCell);
      newRow.appendChild(statusCell);
      console.log(newRow);
      console.log("hi");
      // Append the new row to the table body
      tableBodyRef.current.appendChild(newRow);
    };
    addJobToTable({ job });
      /*  function populateTable() {
      const tableBody = document.getElementById("t-body");
      tableBody.innerHTML = ""; // Clear existing rows (if any)

      // Loop through the array and create a row for each job
      Jobs.forEach((job) => {
        const row = document.createElement("tr"); // Create a new row

        // Create and append table cells to the row
        const cell1 = document.createElement("td");
        cell1.textContent = job.id; // Job ID
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = job.title; // Job Title
        row.appendChild(cell2);

        const cell3 = document.createElement("td");

        const btn = document.createElement("button");
        btn.setAttribute(onclick, closeJob(job.id));
        cell3.appendChild(btn);

        cell3.textContent = Close; // Job Status
        row.appendChild(cell3);
        const cell4 = document.createElement("td");
        if (job.id == data.JobId) {
          cell4.textContent = data.length;
        }
        row.appendChild(cell4);
        console.log(job);

        // Append the row to the table body
        tableBody.appendChild(row);
      }); 
    },
    window.onload = populateTable();
    [location.state]
  );*/
  fetch(`${api}/jobs-dashboard/${email}`).then((res) => setJobs(res.data));

  const handlePostJob = () => {
    navigate("/PostJob", { state: { email } });
  };
  const handleMatchedProfiles = () => {
    navigate("/MatchedProfiles", { state: { Jobs } });
  };
  const closeJob = async (jobId) => {
    const updatedRows = Jobs.filter((job) => job.jobId != jobId);
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
            <tr key={job.jobobId}>
              <td>{job.jobId}</td>
              <td>{job.jobTitle}</td>
              <td>
                <button onClick={() => closeJob(job.jobId)}>Close</button>
              </td>
              {Array.isArray(profiles) &&
                profiles.map((profile) => {
                  if (profile.jobId == job.jobId) {
                    <td>{profile.length}</td>;
                  }
                })}
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobsDashboard;
