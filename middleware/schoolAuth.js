const jwt = require("jsonwebtoken");
const { SchoolUser } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token for school users
const authenticateSchoolToken = async (req, res, next) => {
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

    // Check if it's a school user token
    if (decoded.type !== "school") {
      return res.status(403).json({
        success: false,
        message: "Invalid token type. School authentication required.",
      });
    }

    // Check if user still exists and is active
    const schoolUser = await SchoolUser.findByPk(decoded.userId);
    if (!schoolUser || !schoolUser.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Add user info to request
    req.user = decoded;
    req.schoolUser = schoolUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check if user is school admin
const requireSchoolAdmin = (req, res, next) => {
  if (req.user.role !== "school_admin") {
    return res.status(403).json({
      success: false,
      message: "School admin access required",
    });
  }
  next();
};

module.exports = {
  authenticateSchoolToken,
  requireSchoolAdmin,
};



