import React, { useState , useContext } from "react";

import { UserContext } from './userContext';
import { useNavigate, Link } from "react-router-dom";
import "./CompanyLogin.css";
import { api } from "./App";
function CompanyLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await fetch(`${api}/company/login`, {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      setEmail(credentials.email);
      navigate("/JobsDashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const { setEmail } = useContext(UserContext);
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
