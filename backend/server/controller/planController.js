const Plan = require("../model/PlansModel");
const mongoose = require("mongoose");

module.exports.addSections = async (req, res) => {
  const { title, tasks } = req.body;
  const { planId } = req.params;

  try {
    const userPlan = await Plan.findById(planId);

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
  const { planId, sectionId } = req.params;
  const { task, dueDate } = req.body;

  try {
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const section = plan.sections.id(sectionId);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const newTask = {
      task,
      completed: false,
      dueDate: dueDate || null,
    };

    section.tasks.push(newTask);
    await plan.save();

    res.status(201).json({ message: "Task added successfully", plan });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllTask = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await Plan.findById(planId).populate("sections.tasks");

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
  const { planId, sectionId } = req.params;

  try {
    const userPlan = await Plan.findById(planId);

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
  const { planId, sectionId, taskId } = req.params;

  try {
    const userPlan = await Plan.findById(planId);

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
  const { planId, sectionId, taskId } = req.params;
  const { task, dueDate } = req.body;

  try {
    const userPlan = await Plan.findById(planId);

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
