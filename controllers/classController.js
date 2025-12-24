const { ClassData, Student, Division } = require("../models");
const { Op } = require("sequelize");

// CREATE
exports.createClass = async (req, res) => {
  try {
    const classData = await ClassData.create(req.body);
    res.status(201).json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getClasses = async (req, res) => {
  try {
    const classes = await ClassData.findAll({
      order: [["createdAt", "DESC"]],
    });
    
    // Add counts for each class
    const classesWithCounts = await Promise.all(
      classes.map(async (classItem) => {
        const classData = classItem.toJSON();
        
        // Count students in this class
        const studentCount = await Student.count({
          where: { classId: classItem.id, status: "active" },
        });
        
        // Count divisions for this class (matching by class name or code)
        const divisionCount = await Division.count({
          where: {
            [Op.or]: [
              { class: classItem.name },
              { classCode: classItem.code },
            ],
            status: true,
          },
        });
        
        return {
          ...classData,
          totalStudents: studentCount,
          totalDivisions: divisionCount,
        };
      })
    );
    
    res.json(classesWithCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getClassById = async (req, res) => {
  try {
    const classData = await ClassData.findByPk(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateClass = async (req, res) => {
  try {
    const classData = await ClassData.findByPk(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    await classData.update(req.body);
    res.json(classData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteClass = async (req, res) => {
  try {
    const classData = await ClassData.findByPk(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });
    await classData.destroy();
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const classData = await ClassData.findByPk(req.params.id);
    if (!classData) return res.status(404).json({ error: "Class not found" });

    classData.status = !classData.status;
    await classData.save();

    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
