const { SubCategory, Category } = require("../models");

// CREATE
exports.createSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getSubCategories = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = {};
    
    // Filter by status if provided
    if (status !== undefined) {
      whereClause.status = status === "true" || status === true;
    }
    
    const subCategories = await SubCategory.findAll({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: [{ model: Category, as: "category" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!subCategory)
      return res.status(404).json({ error: "SubCategory not found" });
    res.json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory)
      return res.status(404).json({ error: "SubCategory not found" });
    await subCategory.update(req.body);
    res.json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory)
      return res.status(404).json({ error: "SubCategory not found" });
    await subCategory.destroy();
    res.json({ message: "SubCategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id);
    if (!subCategory)
      return res.status(404).json({ error: "SubCategory not found" });
    subCategory.status = !subCategory.status;
    await subCategory.save();
    res.json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
