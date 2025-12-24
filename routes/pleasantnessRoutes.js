const express = require("express");
const router = express.Router();
const pleasantnessController = require("../controllers/pleasantnessController");

// Pleasantness routes
router.post("/", pleasantnessController.createPleasantness);
router.get("/", pleasantnessController.getPleasantnesses);
router.get("/:id", pleasantnessController.getPleasantnessById);
router.put("/:id", pleasantnessController.updatePleasantness);
router.delete("/:id", pleasantnessController.deletePleasantness);
router.patch("/:id/toggle-status", pleasantnessController.toggleStatus);

module.exports = router; 