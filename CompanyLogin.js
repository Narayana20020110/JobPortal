import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CompanyLogin.css";

function CompanyLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/company/login", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const email = credentials.email;
      navigate("/JobsDashboard", { state: { email } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
     
      <Link to="/CompForgotPassword">Forgot Password?</Link>
    </div>
  );
}

export default CompanyLogin;
