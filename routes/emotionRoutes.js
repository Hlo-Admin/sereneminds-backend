const express = require("express");
const router = express.Router();
const emotionController = require("../controllers/emotionController");

// Emotion routes
router.post("/", emotionController.createEmotion);
router.get("/", emotionController.getEmotions);
router.get("/:id", emotionController.getEmotionById);
router.put("/:id", emotionController.updateEmotion);
router.delete("/:id", emotionController.deleteEmotion);
router.patch("/:id/toggle-status", emotionController.toggleStatus);

module.exports = router;
