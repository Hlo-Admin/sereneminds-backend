const { City, State, Country } = require("../models");

// CREATE
exports.createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getCities = async (req, res) => {
  try {
    const cities = await City.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });
    await city.update(req.body);
    res.json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });
    await city.destroy();
    res.json({ message: "City deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });
    city.status = !city.status;
    await city.save();
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
