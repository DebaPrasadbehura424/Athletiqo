const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const Plan = require("../model/PlansModel");
const Goal = require("../model/GoalModel");

module.exports.RegisterUser = async (req, res) => {
  const { firstName, email, password, confirmPassword } = req.body;

  try {
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const Plans = new Plan({
      user: null,
      sections: [
        { title: "Personal Goals", tasks: [] },
        { title: "Today's Goals", tasks: [] },
      ],
    });
    const saveNewPlan = await Plans.save();

    const Goals = new Goal({
      user: null,
      currentWeight: 0,
      targetWeight: 0,
      sleepGoal: 0,
      readingGoal: 0,
      waterGoal: 0,
      age: 18,
      walkingGoal: 0,
      totalPoints: 0,
      dailyPoints: [0, 0, 0, 0, 0, 0],
      twentyFiveDaysPoints: [],
      sleepGoalOneDay: 0,
      readingGoalOneDay: 0,
      walkingGoalOneDay: 0,
      waterGoalOneDay: 0,
      currentDay: Date.now(),
    });
    const saveNewGoal = await Goals.save();

    const newUser = new userModel({
      firstName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      goalsdetails: saveNewGoal._id,
      planList: saveNewPlan._id,
    });

    const savedUser = await newUser.save();

    saveNewPlan.user = savedUser._id;
    saveNewGoal.user = savedUser._id;

    await saveNewPlan.save();
    await saveNewGoal.save();

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      "NeuranovaAthlenticoanuragdebakarankamanaanshikaweareteams@!IAMDEV",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        email: savedUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "NeuranovaAthlenticoanuragdebakarankamanaanshikaweareteams@!IAMDEV",
      { expiresIn: "24h" }
    );

    const userGoal = await Goal.findOne({ user: user._id });
    if (!userGoal) {
      return res.status(404).json({ message: "Goal data not found!" });
    }

    await userGoal.resetGoalsIfDayChanged();

    return res.status(200).json({
      token,
      user,
      goal: userGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error during login" });
  }
};

module.exports.profileUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
