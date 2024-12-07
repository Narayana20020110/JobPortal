const express = require("express");
const Job = require("../models/Jobs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const router = express.Router();

// @route   POST /api/companies/register
// @desc    Register a new company
// @access  Public
router.post("/register", async (req, res) => {
  const { companyName, email, password, websiteUrl, aboutUs, employeeRange, mobile,termsAccepted,city } =
    req.body;
console.log(req.body);
  try {
    // Check if the company already exists
    let company = await Company.findOne({ email });
    if (company) {
      return res.status(400).json({ msg: "Company already exists" });
    }

    // Create a new company
    company = new Company({
      companyName,
      email,
      password,
      websiteUrl,
      aboutUs,
      employeeRange,
      mobile,
      city,
      termsAccepted,
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(password, salt);

    // Save the company to the database
    await company.save();
    res.status(200).json({ msg: "Company registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/companies/login
// @desc    Login company and return JWT
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
console.log(req.body);
  try {
    // Find company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      company: {
        id: company._id,
      },
    };
    const token = jwt.sign(payload, "your-jwt-secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/companies/password-reset
// @desc    Reset company password
// @access  Public
router.post("/password-reset", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ msg: "Company not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(newPassword, salt);

    // Save the updated company data
    await company.save();
    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   POST /api/companies/post-job
// @desc    Post a new job by the company
// @access  Private (requires company login)
// In real implementation, you can protect this route with JWT middleware
router.post("/post-job/:email", async (req, res) => {
  const {  jobTitle, description } = req.body;
const {email} = req.params;
  try {
    // Ensure that company is logged in by checking JWT (in real-world, you should use middleware for authentication)
   
console.log(email,req.body);
    const newJob = new Job({
      
      jobTitle,
      description,
      email,
    });

    await newJob.save();
    res.status(200).json({ msg: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
