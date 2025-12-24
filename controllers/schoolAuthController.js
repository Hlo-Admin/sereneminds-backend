const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SchoolUser, School } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Register new school user
const register = async (req, res) => {
  try {
    const { name, email, password, phone, schoolId, role = "school_admin" } = req.body;

    // Validate required fields
    if (!name || !email || !password || !schoolId) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and schoolId are required",
      });
    }

    // Check if school exists
    const school = await School.findByPk(schoolId);
    if (!school) {
      return res.status(400).json({
        success: false,
        message: "School not found",
      });
    }

    // Check if user already exists
    const existingUser = await SchoolUser.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new school user
    const schoolUser = await SchoolUser.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      schoolId,
      role,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: schoolUser.id,
        email: schoolUser.email,
        role: schoolUser.role,
        schoolId: schoolUser.schoolId,
        type: "school",
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Get school details
    const schoolDetails = await School.findByPk(schoolId);

    res.status(201).json({
      success: true,
      message: "School user registered successfully",
      data: {
        user: {
          id: schoolUser.id,
          name: schoolUser.name,
          email: schoolUser.email,
          phone: schoolUser.phone,
          role: schoolUser.role,
          schoolId: schoolUser.schoolId,
          school: schoolDetails,
        },
        token,
      },
    });
  } catch (error) {
    console.error("School registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login school user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const schoolUser = await SchoolUser.findOne({
      where: { email },
      include: [{ model: School, as: "school" }],
    });

    if (!schoolUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is active
    if (!schoolUser.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, schoolUser.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: schoolUser.id,
        email: schoolUser.email,
        role: schoolUser.role,
        schoolId: schoolUser.schoolId,
        type: "school",
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: schoolUser.id,
          name: schoolUser.name,
          email: schoolUser.email,
          phone: schoolUser.phone,
          role: schoolUser.role,
          schoolId: schoolUser.schoolId,
          school: schoolUser.school,
        },
        token,
      },
    });
  } catch (error) {
    console.error("School login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get current school user profile
const getProfile = async (req, res) => {
  try {
    const schoolUser = await SchoolUser.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: School, as: "school" }],
    });

    if (!schoolUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: { user: schoolUser },
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



