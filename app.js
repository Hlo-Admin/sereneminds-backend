const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const schoolAuthRoutes = require("./routes/schoolAuthRoutes");
const studentAuthRoutes = require("./routes/studentAuthRoutes");
const branchRoutes = require("./routes/branchRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const boardRoutes = require("./routes/boardRoutes");
const classRoutes = require("./routes/classRoutes");
const divisionRoutes = require("./routes/divisionRoutes");
const academicyearRoutes = require("./routes/academicyearRoutes");
const emotionRoutes = require("./routes/emotionRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const moodRoutes = require("./routes/moodRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const impactRoutes = require("./routes/impactRoutes");
const pleasantnessRoutes = require("./routes/pleasantnessRoutes");
const instituteRoutes = require("./routes/instituteRoutes");
const countryRoutes = require("./routes/countryRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cityRoutes = require("./routes/cityRoutes");
const studentMoodLogRoutes = require("./routes/studentMoodLogRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const eventRoutes = require("./routes/eventRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const documentRoutes = require("./routes/documentRoutes");
const path = require("path");

const app = express();

// Update your CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://sereneminds-frontend.vercel.app",
      "https://serenminds.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/school-auth", schoolAuthRoutes);
app.use("/api/student-auth", studentAuthRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/divisions", divisionRoutes);
app.use("/api/academicyears", academicyearRoutes);
app.use("/api/emotions", emotionRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/impacts", impactRoutes);
app.use("/api/pleasantnesses", pleasantnessRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/student-mood-logs", studentMoodLogRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/documents", documentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
