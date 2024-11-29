import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import UserRegistration from "./UserRegistration";
import CompanyRegistration from "./CompanyRegistration";
import UserLogin from "./UserLogin";
import CompanyLogin from "./CompanyLogin";
import JobListingDashboard from "./JobListingDashboard";
import JobsDashboard from "./JobsDashboard";
import UserForgotPassword from "./UserForgotPassword";
import UserPasswordReset from "./UserPasswordReset";
import CompForgotPassword from "./CompForgotPassword";
import CompPasswordReset from "./CompPasswordReset";
import PostJob from "./PostJob";
import SubmitProfile from "./SubmitProfile";
import MatchedProfiles from "./MatchedProfiles";
function App() {
  const api = "https://n2nkcx-50100.csb.app";
  return (
    <Router>
      <Routes>
        <Route path="/MatchedProfiles" element={<MatchedProfiles />} />
        <Route path="/PostJob" element={<PostJob />} />
        <Route path="/Submitprofile" element={<SubmitProfile />} />
        <Route path="/CompForgotPassword" element={<CompForgotPassword />} />
        <Route path="/CompPasswordReset" element={<CompPasswordReset />} />
        <Route path="/UserPasswordReset" element={<UserPasswordReset />} />
        <Route path="/UserForgotPassword" element={<UserForgotPassword />} />
        <Route path="/CompanyLogin" element={<CompanyLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/JobsDashboard" element={<JobsDashboard />} />
        <Route path="/JobListingDashboard" element={<JobListingDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/userregistration" element={<UserRegistration />} />
        <Route path="/companyregistration" element={<CompanyRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
