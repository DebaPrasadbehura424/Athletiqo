const goalModel = require("../model/GoalModel");

module.exports.getUserDetails = async (req, res) => {
  const userId = req.params.userId;
  try {
    const currentUser = await goalModel.findOne({ user: userId });
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
  const { userId } = req.params;
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
    const user = await goalModel.findOne({ user: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.currentWeight = currentWeight || user.currentWeight;
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
  const userId = req.params.userId;

  try {
    const userGoal = await goalModel.findOne({ user: userId });
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
  const { userId } = req.params;

  try {
    const userGoal = await goalModel.findOne({ user: userId });
    if (!userGoal) {
      return res.status(404).json({ message: "User not found" });
    }

    userGoal.addDailyPoint(points);
    

    res.status(200).json({ message: "Points added successfully", userGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
