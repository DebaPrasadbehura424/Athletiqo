const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  detail: String,
  icon: String,
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
