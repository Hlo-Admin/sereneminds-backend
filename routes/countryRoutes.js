const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

router.post("/", countryController.createCountry);
router.get("/", countryController.getCountries);
router.get("/:id", countryController.getCountryById);
router.put("/:id", countryController.updateCountry);
router.delete("/:id", countryController.deleteCountry);
router.patch("/:id/toggle-status", countryController.toggleStatus);

module.exports = router;
