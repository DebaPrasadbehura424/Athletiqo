const goalsModel = require("../model/goalsModel");

module.exports.getAllGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals" });
  }
};
