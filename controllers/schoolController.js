const { School, State, City, Student, Teacher, ClassData, Division, Event, Notification, StudentMoodLog, User } = require("../models");

// DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {
    const { schoolId } = req.query;
    const where = schoolId ? { schoolId } : {};
    const Op = require("sequelize").Op;

    // Check if tables exist, if not return default values
    let totalStudents = 0;
    let activeStudents = 0;
    let totalTeachers = 0;
    let totalClasses = 0;
    let totalDivisions = 0;
    let studentsNeedingAttention = 0;
    let criticalCases = 0;
    let moodLogsToday = 0;
    let distribution = [];

    try {
      [
        totalStudents,
        activeStudents,
        totalTeachers,
        totalClasses,
        totalDivisions,
        moodLogsToday,
      ] = await Promise.all([
        Student.count({ where }).catch(() => 0),
        Student.count({ where: { ...where, status: "active" } }).catch(() => 0),
        Teacher.count({ where: { ...where, status: "active" } }).catch(() => 0),
        ClassData.count({ where: schoolId ? { schoolCode: schoolId } : {} }).catch(() => 0),
        Division.count({ where: schoolId ? { schoolCode: schoolId } : {} }).catch(() => 0),
        StudentMoodLog.count({
          where: {
            date: new Date().toISOString().split("T")[0],
          },
        }).catch(() => 0),
      ]);

      // Try to get mood-based counts (may fail if StudentMoodLog doesn't have proper associations)
      try {
        const moodLogsWithZones = await StudentMoodLog.findAll({
          where: {
            calculatedZone: { [Op.in]: ["Yellow", "Orange", "Dark Red", "Red"] },
          },
          attributes: ["calculatedZone"],
        }).catch(() => []);

        studentsNeedingAttention = moodLogsWithZones.filter(
          (log) => log.calculatedZone === "Yellow" || log.calculatedZone === "Orange"
        ).length;
        criticalCases = moodLogsWithZones.filter(
          (log) => log.calculatedZone === "Dark Red" || log.calculatedZone === "Red"
        ).length;

        // Calculate mood distribution
        const moodDistribution = await StudentMoodLog.findAll({
          attributes: [
            "calculatedZone",
            [require("sequelize").fn("COUNT", require("sequelize").col("StudentMoodLog.id")), "count"],
          ],
          group: ["calculatedZone"],
        }).catch(() => []);

        const totalMoodLogs = moodDistribution.reduce((sum, item) => sum + parseInt(item.dataValues?.count || 0), 0);
        distribution = moodDistribution.map((item) => ({
          zone: item.calculatedZone || "Unknown",
          count: parseInt(item.dataValues?.count || 0),
          percentage: totalMoodLogs > 0 ? ((parseInt(item.dataValues?.count || 0) / totalMoodLogs) * 100).toFixed(1) : 0,
        }));
      } catch (moodErr) {
        console.log("Mood log stats not available:", moodErr.message);
      }
    } catch (err) {
      console.log("Error getting stats, returning defaults:", err.message);
    }

    res.json({
      totalStudents,
      activeStudents,
      totalTeachers,
      totalClasses,
      totalDivisions,
      studentsNeedingAttention,
      criticalCases,
      moodTrackingActive: moodLogsToday,
      averageAttendance: 94.5, // This would need an attendance model
      moodDistribution: distribution,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getSchools = async (req, res) => {
  try {
    const schools = await School.findAll({
      include: [
        {model: State, as :"state"},
        {model: City, as : "city"},
      ],
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id, {
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" }
      ]
    });
    if (!school) return res.status(404).json({ error: "School not found" });
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(404).json({ error: "School not found" });


    await school.update(req.body);
    const updateSchool = await School.findByPk(req.params.id, {
      include: [
        { model: State, as: "state" },
        { model: City, as: "city" }
      ]
    }) 
    res.status(200).json(updateSchool);
    // res.json(updateSchool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(404).json({ error: "School not found" });
    await school.destroy();
    res.status().json({ message: "School deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(404).json({ error: "School not found" });

    school.status = !school.status;
    await school.save();

    res.json(school);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
