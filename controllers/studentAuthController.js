const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Student, School, ClassData, Division } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Register new student
const register = async (req, res) => {
  try {
    const { name, studentId, email, password, phone, dateOfBirth, address, parentName, parentPhone, parentEmail, schoolId, classId, divisionId } = req.body;

    // Validate required fields
    if (!name || !studentId || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, student ID, email, and password are required",
      });
    }

    // Check if student with email already exists
    const existingStudentByEmail = await Student.findOne({ where: { email } });
    if (existingStudentByEmail) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    // Check if student with studentId already exists
    const existingStudentById = await Student.findOne({ where: { studentId } });
    if (existingStudentById) {
      return res.status(400).json({
        success: false,
        message: "Student with this student ID already exists",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Validate schoolId if provided
    if (schoolId) {
      const school = await School.findByPk(schoolId);
      if (!school) {
        return res.status(400).json({
          success: false,
          message: "School not found",
        });
      }
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new student
    const student = await Student.create({
      name,
      studentId,
      email,
      password: hashedPassword,
      phone: phone || null,
      dateOfBirth: dateOfBirth || null,
      address: address || null,
      parentName: parentName || null,
      parentPhone: parentPhone || null,
      parentEmail: parentEmail || null,
      schoolId: schoolId || null,
      classId: classId || null,
      divisionId: divisionId || null,
      status: "active",
    });

    // Get student with relations
    const studentWithRelations = await Student.findByPk(student.id, {
      include: [
        { model: School, as: "school" },
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
      ],
      attributes: { exclude: ["password"] },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: student.id,
        email: student.email,
        studentId: student.studentId,
        type: "student",
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: {
        user: {
          id: student.id,
          name: student.name,
          studentId: student.studentId,
          email: student.email,
          phone: student.phone,
          schoolId: student.schoolId,
          classId: student.classId,
          divisionId: student.divisionId,
          school: studentWithRelations.school,
          class: studentWithRelations.class,
          division: studentWithRelations.division,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Student registration error:", error);
    console.error("Error stack:", error.stack);
    
    // Check if it's a database column error
    if (error.message && error.message.includes("column") && error.message.includes("does not exist")) {
      return res.status(500).json({
        success: false,
        message: "Database schema error: password column is missing. Please run the migration to add the password field to the Students table.",
        error: error.message,
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login student
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find student by email
    const student = await Student.findOne({
      where: { email },
      include: [
        { model: School, as: "school" },
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
      ],
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if student has a password (for existing students without password)
    if (!student.password) {
      return res.status(401).json({
        success: false,
        message: "Please set a password first. Contact your administrator.",
      });
    }

    // Check if student is active
    if (student.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Account is inactive",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: student.id,
        email: student.email,
        studentId: student.studentId,
        type: "student",
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: student.id,
          name: student.name,
          studentId: student.studentId,
          email: student.email,
          phone: student.phone,
          schoolId: student.schoolId,
          classId: student.classId,
          divisionId: student.divisionId,
          school: student.school,
          class: student.class,
          division: student.division,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Student login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get current student profile
const getProfile = async (req, res) => {
  try {
    const student = await Student.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
      include: [
        { model: School, as: "school" },
        { model: ClassData, as: "class" },
        { model: Division, as: "division" },
      ],
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: { user: student },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Logout (client-side token removal)
const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  logout,
};

