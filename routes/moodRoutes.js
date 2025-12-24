const express = require("express");
const router = express.Router();
const moodController = require("../controllers/moodController");

// Mood routes
router.post("/", moodController.createMood);
router.get("/", moodController.getMoods);
router.get("/:id", moodController.getMoodById);
router.put("/:id", moodController.updateMood);
router.delete("/:id", moodController.deleteMood);
router.patch("/:id/toggle-status", moodController.toggleStatus);

module.exports = router;



