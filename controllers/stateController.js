const { State, Country } = require("../models");

// CREATE
exports.createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// READ ALL
exports.getStates = async (req, res) => {
  try {
    const states = await State.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getStateById = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (!state) return res.status(404).json({ error: "State not found" });
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (!state) return res.status(404).json({ error: "State not found" });
    await state.update(req.body);
    res.json(state);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (!state) return res.status(404).json({ error: "State not found" });
    await state.destroy();
    res.json({ message: "State deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (!state) return res.status(404).json({ error: "State not found" });
    state.status = !state.status;
    await state.save();
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
