const express = require("express");
const router = express.Router();
const divisionController = require("../controllers/divisionController");

// Division routes
router.post("/", divisionController.createDivision);
router.get("/", divisionController.getDivisions);
router.get("/:id", divisionController.getDivisionById);
router.put("/:id", divisionController.updateDivision);
router.delete("/:id", divisionController.deleteDivision);
router.patch("/:id/toggle-status", divisionController.toggleStatus);

module.exports = router;
