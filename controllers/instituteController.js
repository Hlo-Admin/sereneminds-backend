const { Institute } = require("../models");
const { State, City } = require("../models");

// CREATE
exports.createInstitute = async (req, res) => {
  try {
    const institute = await Institute.create(req.body);
    res.status(201).json(institute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// / ...existing code...

// READ ALL
exports.getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.findAll({
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" }
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(institutes);
  } catch (err) {
    console.error("Error fetching institutes:", err);
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findByPk(req.params.id, {
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" }
      ]
    });
    if (!institute)
      return res.status(404).json({ error: "Institute not found" });
    res.json(institute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE
exports.updateInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute)
      return res.status(404).json({ error: "Institute not found" });
    await institute.update(req.body);

    // Fetch the updated institute with associations
    const updatedInstitute = await Institute.findByPk(req.params.id, {
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" }
      ]
    });

    res.json(updatedInstitute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute)
      return res.status(404).json({ error: "Institute not found" });
    await institute.destroy();
    res.json({ message: "Institute deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const institute = await Institute.findByPk(req.params.id);
    if (!institute)
      return res.status(404).json({ error: "Institute not found" });
    institute.status = !institute.status;
    await institute.save();
    res.json(institute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
