const express = require("express");
const router = express.Router();
const impactController = require("../controllers/impactController");

// Impact routes
router.post("/", impactController.createImpact);
router.get("/", impactController.getImpacts);
router.get("/:id", impactController.getImpactById);
router.put("/:id", impactController.updateImpact);
router.delete("/:id", impactController.deleteImpact);
router.patch("/:id/toggle-status", impactController.toggleStatus);

module.exports = router;
