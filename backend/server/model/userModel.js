const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  currentDay: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: Number,
    required: true,
  },
  weightNow: {
    type: Number,
    required: true,
  },
  weightWant: {
    type: Number,
    required: true,
  },
  heartIssue: {
    type: Boolean,
    required: true,
  },
  isWorking: {
    type: Boolean,
    required: true,
  },

  isWorking: {
    type: Boolean,
    required: true,
  },
  activityData: {
    water: [Number],
    sleep: [Number],
    points: [Number],
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
