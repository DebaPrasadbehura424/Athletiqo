const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const connectDB = require("./server/database/db");

// Route Imports
const userRoutes = require("./server/routes/userRoutes");
const planRoutes = require("./server/routes/plansRoute");
const goalRoutes = require("./server/routes/goalRoute");

// Configs
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// CORS Setup
app.use(
  cors({
    origin: "https://athletiqo-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.send("Athletiqo backend running successfully 🏃‍♂️💨");
});

// API Routes
app.use("/user", userRoutes);
app.use("/plans", planRoutes);
app.use("/goals", goalRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
