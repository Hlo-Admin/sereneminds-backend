const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

router.post("/", cityController.createCity);
router.get("/", cityController.getCities);
router.get("/:id", cityController.getCityById);
router.put("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);
router.patch("/:id/toggle-status", cityController.toggleStatus);

module.exports = router;
