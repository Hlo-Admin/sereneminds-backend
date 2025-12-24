const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Student routes
router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
router.patch("/:id/toggle-status", studentController.toggleStatus);

module.exports = router;


