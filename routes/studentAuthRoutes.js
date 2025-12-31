const express = require("express");
const router = express.Router();
const studentAuthController = require("../controllers/studentAuthController");
const { authenticateStudentToken } = require("../middleware/studentAuth");

// Public routes
router.post("/register", studentAuthController.register);
router.post("/login", studentAuthController.login);

// Protected routes
router.get("/profile", authenticateStudentToken, studentAuthController.getProfile);
router.post("/logout", authenticateStudentToken, studentAuthController.logout);

module.exports = router;

