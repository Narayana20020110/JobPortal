const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    jobTitle: { type: String, required: true },
      description: { type: String, required: true },
        email: { type: String, required: true },
        });

        module.exports = mongoose.model("Job", jobSchema);