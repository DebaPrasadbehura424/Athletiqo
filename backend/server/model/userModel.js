const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  targetWeight: {
    type: Number,
    required: true,
  },
  sleepGoal: {
    type: Number,
    required: true,
  },
  readingGoal: {
    type: Number,
    required: true,
  },
  waterGoal: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isWorkingPerson: {
    type: Boolean,
  },
  hasHeartIssue: {
    type: Boolean,
  },
  currentDay: {
    type: Date,
    default: Date.now,
  },
  todoList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
