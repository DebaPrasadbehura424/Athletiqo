const Plan = require("../model/PlansModel");
const mongoose = require("mongoose");

module.exports.addSections = async (req, res) => {
  const { title, tasks } = req.body;
  const userId = req.params.userId;

  try {
    // Validate the ObjectId for userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userPlan = await Plan.findOne({ user: userId });

    if (!userPlan) {
      return res.status(404).json({ message: "User plan not found!" });
    }

    const newSection = {
      title: title,
      tasks: tasks || [],
    };

    userPlan.sections.push(newSection);

    await userPlan.save();

    res.status(201).json(newSection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addTask = async (req, res) => {
  const { sectionId } = req.params;
  const { task, dueDate } = req.body;

  try {
    // Validate the ObjectId for sectionId and userId
    if (
      !mongoose.Types.ObjectId.isValid(req.params.userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId)
    ) {
      return res.status(400).json({ message: "Invalid section or user ID" });
    }

    const plan = await Plan.findOne({
      user: req.params.userId,
      "sections._id": sectionId,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan or section not found" });
    }

    const section = plan.sections.find((s) => s._id.toString() === sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const newTask = {
      task: task,
      completed: false,
      dueDate: dueDate || null,
    };

    section.tasks.push(newTask);
    await plan.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllTask = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const tasks = await Plan.find({ user: userId });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
};

module.exports.deleteSectionBySectionId = async (req, res) => {
  const userId = req.params.userId;
  const sectionId = req.params.sectionId;

  try {
    // Validate userId and sectionId
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId)
    ) {
      return res.status(400).json({ message: "Invalid user or section ID" });
    }

    const currentUser = await Plan.findOne({ user: userId });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.sections.pull({ _id: sectionId });

    await currentUser.save();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the section" });
  }
};

module.exports.deleteTaskByTaskId = async (req, res) => {
  const userId = req.params.userId;
  const sectionId = req.params.sectionId;
  const taskId = req.params.taskId;

  try {
    // Validate userId, sectionId, and taskId
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user, section, or task ID" });
    }

    const currentUser = await Plan.findOne({ user: userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const section = currentUser.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const taskIndex = section.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    section.tasks.splice(taskIndex, 1);
    await currentUser.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the task" });
  }
};
