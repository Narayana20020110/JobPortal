const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  jobId: { type: String , required: true },
  userName: { type: String , required: true },
  resume: { required: true,       // For storing file data as binary
    type: String},
           // To track the file //type (e.g., application/pdf), 
            
  email: { type: String, required: true }, // User's email //to contact for submission //updates
  date:{ type : Date, default: Date.now}
});

module.exports = mongoose.model("Submission", submissionSchema);
