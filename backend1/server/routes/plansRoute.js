const express = require("express");
const planController = require("../controller/planController");

const router = express.Router();
router.post("/:planId/section", planController.addSections);
router.post("/:planId/section/:sectionId/task", planController.addTask);
router.get("/:planId/getAll", planController.getAllTask);
router.delete(
  "/:planId/delete/:sectionId/sectionId",
  planController.deleteSectionBySectionId
);
router.delete(
  "/:planId/delete/:sectionId/sectionId/:taskId/taskId",
  planController.deleteTaskByTaskId
);

router.put("/:planId/section/:sectionId/task/:taskId", planController.editTask);
module.exports = router;
