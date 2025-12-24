const { Impact } = require("../models");

// CREATE
exports.createImpact = async (req, res) => {
  try {
    const impact = await Impact.create(req.body);
    res.status(201).json(impact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getImpacts = async (req, res) => {
  try {
    const impacts = await Impact.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(impacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getImpactById = async (req, res) => {
  try {
    const impact = await Impact.findByPk(req.params.id);
    if (!impact) return res.status(404).json({ error: "Impact not found" });
    res.json(impact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateImpact = async (req, res) => {
  try {
    const impact = await Impact.findByPk(req.params.id);
    if (!impact) return res.status(404).json({ error: "Impact not found" });
    await impact.update(req.body);
    res.json(impact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteImpact = async (req, res) => {
  try {
    const impact = await Impact.findByPk(req.params.id);
    if (!impact) return res.status(404).json({ error: "Impact not found" });
    await impact.destroy();
    res.json({ message: "Impact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const impact = await Impact.findByPk(req.params.id);
    if (!impact) return res.status(404).json({ error: "Impact not found" });

    impact.status = !impact.status;
    await impact.save();

    res.json(impact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
