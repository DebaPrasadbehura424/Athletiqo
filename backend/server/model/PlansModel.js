const mongoose = require("mongoose");

// Task schema
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
});

const planSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const plansSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sections: [planSectionSchema],
});

module.exports = mongoose.model("Plan", plansSchema);
