const express = require("express");
const path = require ("path");
const fs = require ("fs");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const Submission = require("./models/Submission");
const Job = require("./models/Jobs");
const connectDB = require("./db");
const cors = require("cors");
const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send(`
    <h1>Job Portal Backend</h1>
    <p>This is the backend for a job portal application. Use API endpoints to access functionalities.</p>
    <ul>
      <li><strong>POST /company/register</strong> - Register a company</li>
      <li><strong>POST /company/login</strong> - Login for companies</li>
      <li><strong>POST /user/register</strong> - register a user</li>
      <li><strong>Post
/user/login</strong> -Login for user</li>
<li><strong>Post /post-job
</strong>post a job</li>
      <li><strong>GET /jobs</strong> - View all jobs</li>
    </ul>
  `);
});
// User API
app.use("/user", userRoutes);

// Company API
app.use("/company", companyRoutes);

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/jobs/:jobId
// @desc    Delete a job by jobId
// @access  Public
app.delete("/delete/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.status(200).json({ msg: "Job deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/submission/:id
// @desc    Post a job submission using id param into Submission DB
// @access  Public

app.post("/job/:jobId",async (req , res) => {
  try {
    
    const { jobId } =req.params; // Extract ID from URL
const {userName , email , resume} = req.body; 
    // Extract submission details from request body

  
  /*if (resume && resume.startsWith('data:')) {
    const base64Data = resume.replace(/^data:.*,/, ''); // Strip the header part (e.g., 'data:image/jpeg;base64,')
    const buffer = Buffer.from(base64Data, 'base64');

    // Store the file in the "uploads" directory
    const filePath = path.join(__dirname, 'uploads', `${Date.now()}.pdf`);
    fs.writeFileSync(filePath, buffer); }*/
    
    const newSubmission = new Submission({
      jobId,
      userName,
      email,
      resume,
  
      
    });
console.log(newSubmission);
    await newSubmission.save();
    res.status(200).json({
      msg: "Submission added successfully",
  
      submission: newSubmission,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/*app.get('/download/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.set('Content-Type', submission.resume.contentType);
    res.send(submission.resume.data);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading resume' });
  }
});*/

// @route   GET /api/submission/:jobId
// @desc    Get all submissions for a specific jobId
// @access  Public
app.get("/matched/:jobId", async (req, res) => {
  const {jobId} = req.params;
 
  try {
    

    const submissions = await Submission.find({ jobId });
    if (submissions.length === 0) {
      return res
        .status(404)
        .json({ msg: "No submissions found for this jobId" });
    }
console.log(submissions);
    res.status(200).json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/jobs-dashboard/:email", async (req, res) => {
  const {email} = req.params;
  try {
    
    console.log(email);
    const jobs = await Job.find({ email });
    res.status(200).json(jobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
