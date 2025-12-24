const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Event routes
router.post("/", eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/:id/toggle-status", eventController.toggleStatus);

module.exports = router;


