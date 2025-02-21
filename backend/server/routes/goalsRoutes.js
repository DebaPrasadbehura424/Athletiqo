const express = require("express");
const router = express.Router();
const { getAllGoals } = require("../controller/goalsController");

router.get("/allGoal", getAllGoals);

module.exports = router;
