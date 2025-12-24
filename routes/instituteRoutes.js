const express = require("express");
const router = express.Router();
const instituteController = require("../controllers/instituteController");

// Institute routes
router.post("/", instituteController.createInstitute);
router.get("/", instituteController.getInstitutes);
router.get("/:id", instituteController.getInstituteById);
router.put("/:id", instituteController.updateInstitute);
router.delete("/:id", instituteController.deleteInstitute);
router.patch("/:id/toggle-status", instituteController.toggleStatus);

module.exports = router;
