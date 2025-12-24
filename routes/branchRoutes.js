const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");

// Branch routes
router.post("/", branchController.createBranch);
router.get("/", branchController.getBranches);
router.get("/:id", branchController.getBranchById);
router.put("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);
router.patch("/:id/toggle-status", branchController.toggleStatus);
router.get("/institutes/:instituteId", branchController.getBranchesByInstitute);

module.exports = router;
