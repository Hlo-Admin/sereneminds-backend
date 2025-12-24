const { Teacher, School } = require("../models");

// CREATE
exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    const teacherWithRelations = await Teacher.findByPk(teacher.id, {
      include: [{ model: School, as: "school" }],
    });
    res.status(201).json(teacherWithRelations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getTeachers = async (req, res) => {
  try {
    const { schoolId, status, search } = req.query;
    const where = {};
    
    if (schoolId) where.schoolId = schoolId;
    if (status) where.status = status;
    if (search) {
      where[require("sequelize").Op.or] = [
        { name: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { employeeId: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { email: { [require("sequelize").Op.iLike]: `%${search}%` } },
      ];
    }

    const teachers = await Teacher.findAll({
      where,
      include: [{ model: School, as: "school" }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    await teacher.update(req.body);
    const updatedTeacher = await Teacher.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    await teacher.destroy();
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    teacher.status = teacher.status === "active" ? "inactive" : "active";
    await teacher.save();

    const updatedTeacher = await Teacher.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


