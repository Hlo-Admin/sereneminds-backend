const { Branch } = require("../models");
const { State, City } = require("../models");

// CREATE
exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" },
      ]

    });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get branches by selected institute, it will return list of branches
exports.getBranchesByInstitute = async (req, res) => {
  try { 
    const branches = await Branch.findAll({
      where: { instituteId: req.params.instituteId },
      order: [["createdAt", "DESC"]],
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" },
      ]
    });
    res.json(branches);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  } 
};


// READ ONE
exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id, {
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" },
      ]
    });
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    await branch.update(req.body);
     const updatedBranch = await Branch.findByPk(req.params.id, {
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" },
      ]
    });
    res.json(updatedBranch);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    await branch.destroy();
    res.json({ message: "Branch deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });

    branch.status = !branch.status;
    await branch.save();

    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
