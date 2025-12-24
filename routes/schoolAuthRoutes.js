const express = require("express");
const router = express.Router();
const schoolAuthController = require("../controllers/schoolAuthController");
const { authenticateSchoolToken } = require("../middleware/schoolAuth");

// Public routes
router.post("/register", schoolAuthController.register);
router.post("/login", schoolAuthController.login);

// Protected routes
router.get("/profile", authenticateSchoolToken, schoolAuthController.getProfile);
router.post("/logout", authenticateSchoolToken, schoolAuthController.logout);

module.exports = router;



