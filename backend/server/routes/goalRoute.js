const goalController = require("../controller/goalController");
const express = require("express");
const router = express.Router();

router.get("/getUserdetails/:userId", goalController.getUserDetails);
router.put("/updateUserdetails/:userId", goalController.updateUserDetails);
router.patch("/incrementGoal/:userId", goalController.incrementGoalProgress);

module.exports = router;
