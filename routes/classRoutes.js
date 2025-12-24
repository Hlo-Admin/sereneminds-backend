const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

// Class routes
router.post("/", classController.createClass);
router.get("/", classController.getClasses);
router.get("/:id", classController.getClassById);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);
router.patch("/:id/toggle-status", classController.toggleStatus);

module.exports = router;
