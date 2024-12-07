const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  websiteUrl: { type: String, required: true }, // URL to the company website
  employeeRange: { type: String, required: true }, // E.g., "50-200", "200-500"
  aboutUs: { type: String, required: true }, // Short description of the company
  city: { type: String, required: true },
  termsAccepted: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);
