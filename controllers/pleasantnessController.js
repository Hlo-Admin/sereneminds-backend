const { Pleasantness } = require("../models");

// CREATE
exports.createPleasantness = async (req, res) => {
  try {
    const pleasantness = await Pleasantness.create(req.body);
    res.status(201).json(pleasantness);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getPleasantnesses = async (req, res) => {
  try {
    const pleasantnesses = await Pleasantness.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(pleasantnesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getPleasantnessById = async (req, res) => {
  try {
    const pleasantness = await Pleasantness.findByPk(req.params.id);
    if (!pleasantness)
      return res.status(404).json({ error: "Pleasantness not found" });
    res.json(pleasantness);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updatePleasantness = async (req, res) => {
  try {
    const pleasantness = await Pleasantness.findByPk(req.params.id);
    if (!pleasantness)
      return res.status(404).json({ error: "Pleasantness not found" });
    await pleasantness.update(req.body);
    res.json(pleasantness);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deletePleasantness = async (req, res) => {
  try {
    const pleasantness = await Pleasantness.findByPk(req.params.id);
    if (!pleasantness)
      return res.status(404).json({ error: "Pleasantness not found" });
    await pleasantness.destroy();
    res.json({ message: "Pleasantness deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const pleasantness = await Pleasantness.findByPk(req.params.id);
    if (!pleasantness)
      return res.status(404).json({ error: "Pleasantness not found" });

    pleasantness.status = !pleasantness.status;
    await pleasantness.save();

    res.json(pleasantness);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
