const Plan = require("../model/PlansModel");
const mongoose = require("mongoose");

module.exports.addSections = async (req, res) => {
  const { title, tasks } = req.body;
  const userId = req.params.userId;

  try {
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
  const { userId, sectionId } = req.params;
  const { task, dueDate } = req.body;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId)
    ) {
      return res.status(400).json({ message: "Invalid section or user ID" });
    }

    const plan = await Plan.findOne({
      user: userId,
      "sections._id": sectionId,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan or section not found" });
    }

    const section = plan.sections.id(sectionId);
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
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const plan = await Plan.findOne({ user: userId }).populate(
      "sections.tasks"
    );

    if (!plan) {
      return res.status(404).json({ message: "No plan found for this user" });
    }

    res.status(200).json(plan.sections);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports.deleteSectionBySectionId = async (req, res) => {
  const { userId, sectionId } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId)
    ) {
      return res.status(400).json({ message: "Invalid user or section ID" });
    }

    const userPlan = await Plan.findOne({ user: userId });

    if (!userPlan) {
      return res.status(404).json({ message: "User plan not found" });
    }

    const sectionIndex = userPlan.sections.findIndex(
      (section) => section._id.toString() === sectionId
    );

    if (sectionIndex === -1) {
      return res.status(404).json({ message: "Section not found" });
    }

    userPlan.sections.splice(sectionIndex, 1);
    await userPlan.save();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteTaskByTaskId = async (req, res) => {
  const { userId, sectionId, taskId } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user, section, or task ID" });
    }

    const userPlan = await Plan.findOne({ user: userId });

    if (!userPlan) {
      return res.status(404).json({ message: "User plan not found" });
    }

    const section = userPlan.sections.id(sectionId);
    const task = section.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    section.tasks.pull(task);
    await userPlan.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.editTask = async (req, res) => {
  const { userId, sectionId, taskId } = req.params;
  const { task, dueDate } = req.body;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(sectionId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res.status(400).json({ message: "Invalid IDs" });
    }

    const userPlan = await Plan.findOne({ user: userId });

    if (!userPlan) {
      return res.status(404).json({ message: "User plan not found" });
    }

    const section = userPlan.sections.id(sectionId);
    const taskObj = section.tasks.id(taskId);

    if (!taskObj) {
      return res.status(404).json({ message: "Task not found" });
    }

    taskObj.task = task || taskObj.task;
    taskObj.dueDate = dueDate || taskObj.dueDate;

    await userPlan.save();

    res.status(200).json(taskObj);
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ message: "Error editing task" });
  }
};
