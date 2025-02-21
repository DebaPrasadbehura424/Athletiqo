const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./server/database/db");

const app = express();

// Routes
const userRoutes = require("./server/routes/userRoutes");

dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("Hello");
});

// API Routes
app.use("/user", userRoutes);

module.exports = app;
