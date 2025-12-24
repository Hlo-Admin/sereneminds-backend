const express = require("express");
const router = express.Router();
const zoneController = require("../controllers/zoneController");

// Zone routes
router.post("/", zoneController.createZone);
router.get("/", zoneController.getZones);
router.get("/:id", zoneController.getZoneById);
router.put("/:id", zoneController.updateZone);
router.delete("/:id", zoneController.deleteZone);
router.patch("/:id/toggle-status", zoneController.toggleStatus);

module.exports = router;
