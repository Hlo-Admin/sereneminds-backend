const express = require("express");
const router = express.Router();
const academicyearController = require("../controllers/academicyearController");

// Academic Year routes
router.post("/", academicyearController.createAcademicYear);
router.get("/", academicyearController.getAcademicYears);
router.get("/:id", academicyearController.getAcademicYearById);
router.put("/:id", academicyearController.updateAcademicYear);
router.delete("/:id", academicyearController.deleteAcademicYear);
router.patch("/:id/toggle-status", academicyearController.toggleStatus);

module.exports = router;
