const mongoose = require("mongoose");

const connectDB = async () => {
  const URI =
    "mongodb+srv://debaprasadbehura89:s5dY5LSzdhymR4AB@cluster0.9chhe.mongodb.net/Fityatra?retryWrites=true&w=majority&appName=Cluster0";
  // const URI = "mongodb://localhost:27017/Fityatra";
  // ("mongodb+srv://debaprasadbehura89:s5dY5LSzdhymR4AB@cluster0.9chhe.mongodb.net/Agent?retryWrites=true&w=majority&appName=Cluster0");
  try {
    await mongoose.connect(URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
