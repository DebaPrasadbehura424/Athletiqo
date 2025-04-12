const goalController = require("../controller/goalController");
const express = require("express");
const router = express.Router();

router.get("/getUserdetails/:goalId", goalController.getUserDetails);
router.put("/updateUserdetails/:goalId", goalController.updateUserDetails);
router.patch("/incrementGoal/:goalId", goalController.incrementGoalProgress);
router.patch("/addPoints/:goalId", goalController.addAllponits);
router.patch("/trackCal/:time/:goalId", goalController.updateTaskCal);

module.exports = router;
