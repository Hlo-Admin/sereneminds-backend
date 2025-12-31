const jwt = require("jsonwebtoken");
const { Student } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token for students
const authenticateStudentToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if it's a student token
    if (decoded.type !== "student") {
      return res.status(403).json({
        success: false,
        message: "Invalid token type. Student authentication required.",
      });
    }

    // Check if student still exists and is active
    const student = await Student.findByPk(decoded.userId);
    if (!student || student.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Add user info to request
    req.user = decoded;
    req.student = student;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  authenticateStudentToken,
};

