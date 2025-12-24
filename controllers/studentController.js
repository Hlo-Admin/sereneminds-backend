const { Student, ClassData, Division, School } = require("../models");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    console.log("Received student creation request:", JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    if (!req.body.name || !req.body.studentId || !req.body.email) {
      const missingFields = [];
      if (!req.body.name) missingFields.push("name");
      if (!req.body.studentId) missingFields.push("studentId");
      if (!req.body.email) missingFields.push("email");
      
      console.log("Missing required fields:", missingFields);
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(", ")}` 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      console.log("Invalid email format:", req.body.email);
      return res.status(400).json({ error: "Invalid email format" });
    }

    // If parentEmail is provided, validate it too
    if (req.body.parentEmail && req.body.parentEmail.trim() && !emailRegex.test(req.body.parentEmail)) {
      console.log("Invalid parent email format:", req.body.parentEmail);
      return res.status(400).json({ error: "Invalid parent email format" });
    }

    // Check if studentId already exists
    const existingStudent = await Student.findOne({ where: { studentId: req.body.studentId } });
    if (existingStudent) {
      console.log("Duplicate studentId:", req.body.studentId);
      return res.status(400).json({ 
        error: `Student ID "${req.body.studentId}" already exists. Please use a different ID.` 
      });
    }

    // Validate classId if provided
    if (req.body.classId) {
      const classExists = await ClassData.findByPk(req.body.classId);
      if (!classExists) {
        console.log("Invalid classId:", req.body.classId);
        return res.status(400).json({ 
          error: `Class with ID ${req.body.classId} does not exist. Please select a valid class.` 
        });
      }
    }

    // Validate divisionId if provided
    if (req.body.divisionId) {
      const divisionExists = await Division.findByPk(req.body.divisionId);
      if (!divisionExists) {
        console.log("Invalid divisionId:", req.body.divisionId);
        return res.status(400).json({ 
          error: `Division with ID ${req.body.divisionId} does not exist. Please select a valid division.` 
        });
      }
      // If divisionId is provided, verify it belongs to the selected class (if classId is also provided)
      if (req.body.classId && divisionExists.classId !== req.body.classId) {
        console.log("Division does not belong to selected class");
        return res.status(400).json({ 
          error: `The selected division does not belong to the selected class.` 
        });
      }
    }

    // Set default schoolId if not provided (use first school as default)
    if (!req.body.schoolId) {
      const firstSchool = await School.findOne({ order: [["id", "ASC"]] });
      if (firstSchool) {
        req.body.schoolId = firstSchool.id;
        console.log("Auto-assigned schoolId:", firstSchool.id);
      } else {
        console.log("No schools found in database");
        return res.status(400).json({ 
          error: "No schools found. Please create a school first." 
        });
      }
    }

    // Clean up the data - remove null values for optional fields
    const studentData = {
      name: req.body.name.trim(),
      studentId: req.body.studentId.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone?.trim() || null,
      classId: req.body.classId || null,
      divisionId: req.body.divisionId || null,
      schoolId: req.body.schoolId,
      status: req.body.status || "active",
      dateOfBirth: req.body.dateOfBirth || null,
      address: req.body.address?.trim() || null,
      parentName: req.body.parentName?.trim() || null,
      parentPhone: req.body.parentPhone?.trim() || null,
      parentEmail: req.body.parentEmail?.trim() || null,
      enrollmentDate: req.body.enrollmentDate || null,
    };

    console.log("Creating student with data:", JSON.stringify(studentData, null, 2));
    const student = await Student.create(studentData);
    console.log("Student created successfully with ID:", student.id);
    
    const studentWithRelations = await Student.findByPk(student.id, {
      include: [
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
        { model: School, as: "school" },
      ],
    });
    res.status(201).json(studentWithRelations);
  } catch (err) {
    console.error("Error creating student:", err);
    console.error("Error stack:", err.stack);
    res.status(400).json({ 
      error: err.message || "Failed to create student",
      details: err.errors ? err.errors.map(e => e.message).join(", ") : undefined
    });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  try {
    const { schoolId, classId, divisionId, status, search } = req.query;
    const where = {};
    
    if (schoolId) where.schoolId = schoolId;
    if (classId) where.classId = classId;
    if (divisionId) where.divisionId = divisionId;
    if (status) where.status = status;
    if (search) {
      where[require("sequelize").Op.or] = [
        { name: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { studentId: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { email: { [require("sequelize").Op.iLike]: `%${search}%` } },
      ];
    }

    const students = await Student.findAll({
      where,
      include: [
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
        { model: School, as: "school" },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
        { model: School, as: "school" },
      ],
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Validate email format if provided
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }

    // If parentEmail is provided, validate it too
    if (req.body.parentEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.parentEmail)) {
        return res.status(400).json({ error: "Invalid parent email format" });
      }
    }

    await student.update(req.body);
    const updatedStudent = await Student.findByPk(req.params.id, {
      include: [
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
        { model: School, as: "school" },
      ],
    });
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(400).json({ 
      error: err.message || "Failed to update student",
      details: err.errors ? err.errors.map(e => e.message).join(", ") : undefined
    });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    await student.destroy();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.status = student.status === "active" ? "inactive" : "active";
    await student.save();

    const updatedStudent = await Student.findByPk(req.params.id, {
      include: [
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
        { model: School, as: "school" },
      ],
    });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


