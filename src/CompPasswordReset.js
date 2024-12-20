import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./PasswordReset.css";
import { api } from "./App";
function CompPasswordReset() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch(`${api}/company/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: location.state.email,
          ...passwords.confirmPassword,
        }),
      });
      if (res.status == 200) {
        navigate("/CompanyLogin");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwords.confirmPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, confirmPassword: e.target.value })
          }
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompPasswordReset;
