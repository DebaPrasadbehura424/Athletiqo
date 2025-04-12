const goalModel = require("../model/GoalModel");

module.exports.getUserDetails = async (req, res) => {
  const { goalId } = req.params;
  try {
    const currentUser = await goalModel.findById(goalId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ message: "User does not exist or has no goals." });
    }
    return res.status(200).json(currentUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.updateUserDetails = async (req, res) => {
  const { goalId } = req.params;
  const {
    currentWeight,
    targetWeight,
    sleepGoal,
    readingGoal,
    waterGoal,
    walkingGoal,
    age,
  } = req.body;
  try {
    const user = await goalModel.findById(goalId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.currenWeight = currentWeight || user.currentWeight;
    user.targetWeight = targetWeight || user.targetWeight;
    user.sleepGoal = sleepGoal || user.sleepGoal;
    user.readingGoal = readingGoal || user.readingGoal;
    user.waterGoal = waterGoal || user.waterGoal;
    user.walkingGoal = walkingGoal || user.walkingGoal;
    user.age = age || user.age;
    const updatedUser = await user.save();
    return res.status(200).json({
      message: "User details updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.incrementGoalProgress = async (req, res) => {
  const { goalType, amount } = req.body;
  const { goalId } = req.params;

  try {
    const userGoal = await goalModel.findById(goalId);
    if (!userGoal) {
      return res.status(404).json({ message: "User not found" });
    }
    await userGoal.incrementGoalProgress(goalType, amount);
    return res.status(200).json({ message: "Goal updated", userGoal });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.addAllponits = async (req, res) => {
  const { points } = req.body;
  const { goalId } = req.params;

  try {
    const userGoal = await goalModel.findById(goalId);
    if (!userGoal) {
      return res.status(404).json({ message: "User not found" });
    }

    await userGoal.addDailyPoint(points);

    res.status(200).json({ message: "Points added successfully", userGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateTaskCal = async (req, res) => {
  const { time, goalId } = req.params;
  try {
    const userGoal = await goalModel.findById(goalId);
    if (!userGoal) {
      return res.status(404).json({ message: "User not found" });
    }

    if (time == "dinner") {
      userGoal.tracks.dinner = !userGoal.tracks.dinner;
    } else if (time == "lunch") {
      userGoal.tracks.lunch = !userGoal.tracks.lunch;
    } else {
      userGoal.tracks.breakFast = !userGoal.tracks.breakFast;
    }
    await userGoal.save();
    res.status(200).json("update succesfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
