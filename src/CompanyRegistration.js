import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CompanyRegistration.css";

import { api } from "./App";
const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    employeeRange: "",
    city: "",
    email: "",
    password: "",
    mobile: "",
    aboutUs: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${api}/company/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const email = formData.email;
        navigate("/JobsDashboard", { state: { email } });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="company-registration-container">
      <h2>
        Company Registration Already registered?
        <Link to="/CompanyLogin">Login</Link>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="websiteUrl"
          placeholder="Website URL"
          value={formData.websiteUrl}
          onChange={handleChange}
          required
        />
        <select
          name="employeeRange"
          value={formData.employeeRange}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee Range</option>
          <option value="0-10">0-10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
          <option value="100+">100+</option>
        </select>
        <input
          type="text"
          name="city"
          placeholder="Company Location City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <textarea
          name="aboutUs"
          placeholder="Brief about company"
          value={formData.aboutUs}
          onChange={handleChange}
          required
        ></textarea>
        <label>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <span>
            By submitting, you confirm the submission as per the terms and
            conditions.
          </span>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CompanyRegistration;
