const express = require("express");
const planController = require("../controller/planController");

const router = express.Router();
router.post("/:userId/section", planController.addSections);
router.post("/:userId/section/:sectionId/task", planController.addTask);
router.get("/:userId/getAll", planController.getAllTask);
router.delete(
  "/:userId/delete/:sectionId/sectionId",
  planController.deleteSectionBySectionId
);
router.delete(
  "/:userId/delete/:sectionId/sectionId/:taskId/taskId",
  planController.deleteTaskByTaskId
);

router.put("/:userId/section/:sectionId/task/:taskId", planController.editTask);
module.exports = router;
