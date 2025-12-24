const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

// SubCategory routes
router.post("/", subcategoryController.createSubCategory);
router.get("/", subcategoryController.getSubCategories);
router.get("/:id", subcategoryController.getSubCategoryById);
router.put("/:id", subcategoryController.updateSubCategory);
router.delete("/:id", subcategoryController.deleteSubCategory);
router.patch("/:id/toggle-status", subcategoryController.toggleStatus);

module.exports = router;
