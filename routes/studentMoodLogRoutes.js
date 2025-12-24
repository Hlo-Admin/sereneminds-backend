const express = require("express");
const router = express.Router();
const studentMoodLogController = require("../controllers/studentMoodLogController");

// Student Mood Log routes
router.post("/", studentMoodLogController.createMoodLog);
router.get("/", studentMoodLogController.getMoodLogs);
router.get("/:id", studentMoodLogController.getMoodLogById);
router.put("/:id", studentMoodLogController.updateMoodLog);
router.delete("/:id", studentMoodLogController.deleteMoodLog);
router.patch("/:id/toggle-status", studentMoodLogController.toggleStatus);

module.exports = router;

