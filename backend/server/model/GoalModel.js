const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  walkingGoal: {
    type: Number,
    required: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  todayPoints: {
    type: Number,
    default: 0,
  },
  dailyPoints: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0, 0],
  },
  currentDay: {
    type: Date,
    default: Date.now,
  },
  sleepGoalOneDay: {
    type: Number,
    default: 0,
  },
  readingGoalOneDay: {
    type: Number,
    default: 0,
  },
  waterGoalOneDay: {
    type: Number,
    default: 0,
  },
  walkingGoalOneDay: {
    type: Number,
    default: 0,
  },
  tracks: {
    breakFast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
});

goalSchema.methods.resetGoalsIfDayChanged = function () {
  const currentDate = new Date();
  const storedDate = this.currentDay ? new Date(this.currentDay) : new Date(0);

  const isSameDay =
    currentDate.getFullYear() === storedDate.getFullYear() &&
    currentDate.getMonth() === storedDate.getMonth() &&
    currentDate.getDate() === storedDate.getDate();

  if (!isSameDay) {
    if (this.dailyPoints.length >= 7) {
      this.dailyPoints.shift();
    }

    this.dailyPoints.push(this.todayPoints);

    this.todayPoints = 0;
    this.sleepGoalOneDay = 0;
    this.readingGoalOneDay = 0;
    this.waterGoalOneDay = 0;
    this.walkingGoalOneDay = 0;

    this.tracks.breakFast = false;
    this.tracks.lunch = false;
    this.tracks.dinner = false;

    this.currentDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    return this.save();
  }

  return Promise.resolve(this);
};

goalSchema.methods.addDailyPoint = function (newPoint) {
  this.todayPoints += newPoint;
  this.totalPoints += newPoint;
  return this.save();
};

goalSchema.methods.incrementGoalProgress = function (goalType, amount) {
  if (goalType === "sleepGoalOneDay") {
    this.sleepGoalOneDay += amount;
  } else if (goalType === "readingGoalOneDay") {
    this.readingGoalOneDay += amount;
  } else if (goalType === "waterGoalOneDay") {
    this.waterGoalOneDay += amount;
  } else if (goalType === "walkingGoalOneDay") {
    this.walkingGoalOneDay += amount;
  }
  return this.save();
};

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
