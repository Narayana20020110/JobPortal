const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Replace the following with your actual MongoDB URI
    const uri =
      "mongodb+srv://Yagna:20f01a05F6@coin-flip.sydzu.mongodb.net/MyDB?retryWrites=true&w=majority&appName=coin-flip"; // Or your MongoDB Atlas connection string
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connection function
module.exports = connectDB;
