import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/userregistration">
        <button>Jobseeker</button>
      </Link>
      <Link to="/companyregistration">
        <button>Job Provider</button>
      </Link>
    </div>
  );
}

export default HomePage;
