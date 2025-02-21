const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

module.exports.RegisterUser = async (req, res) => {
  const {
    username,
    email,
    password,
    age,
    weightNow,
    weightWant,
    heartIssue,
    isWorking,
  } = req.body;

  try {
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      age,
      weightNow,
      weightWant,
      heartIssue,
      isWorking,
      activityData: {
        water: [],
        sleep: [],
        points: [],
      },
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        age: savedUser.age,
        weightNow: savedUser.weightNow,
        weightWant: savedUser.weightWant,
        heartIssue: savedUser.heartIssue,
        isWorking: savedUser.isWorking,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (!user) {
      return res
        .status(400)
        .json({ message: "something are wrong with your data" });
    }
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "password is incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(400).json("there is some error");
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
        username: user.username,
        email: user.email,
        age: user.age,
        weightNow: user.weightNow,
        weightWant: user.weightWant,
        heartIssue: user.heartIssue,
        isWorking: user.isWorking,
        activityData: user.activityData,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
