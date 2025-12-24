const { StudentMoodLog, User, Category, SubCategory } = require("../models");

// CREATE - Log a new mood
exports.createMoodLog = async (req, res) => {
  try {
    const moodLog = await StudentMoodLog.create(req.body);
    
    // Fetch the created mood log with related details
    const moodLogWithDetails = await StudentMoodLog.findByPk(moodLog.id, {
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "code"],
        },
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["id", "name", "code"],
        },
      ],
    });
    
    res.status(201).json(moodLogWithDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL - Get all mood logs with optional filters
exports.getMoodLogs = async (req, res) => {
  try {
    const { studentId, status, dateFrom, dateTo } = req.query;
    const whereClause = {};
    
    // Filter by student ID
    if (studentId) {
      whereClause.studentId = studentId;
    }
    
    // Filter by status
    if (status !== undefined) {
      whereClause.status = status === "true" || status === true;
    }
    
    // Filter by date range
    if (dateFrom && dateTo) {
      whereClause.date = {
        [require("sequelize").Op.between]: [dateFrom, dateTo],
      };
    } else if (dateFrom) {
      whereClause.date = {
        [require("sequelize").Op.gte]: dateFrom,
      };
    } else if (dateTo) {
      whereClause.date = {
        [require("sequelize").Op.lte]: dateTo,
      };
    }
    
    const moodLogs = await StudentMoodLog.findAll({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "code"],
        },
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["id", "name", "code"],
        },
      ],
      order: [["date", "DESC"], ["time", "DESC"]],
    });
    
    res.json(moodLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE - Get a single mood log by ID
exports.getMoodLogById = async (req, res) => {
  try {
    const moodLog = await StudentMoodLog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "code"],
        },
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["id", "name", "code"],
        },
      ],
    });
    
    if (!moodLog) {
      return res.status(404).json({ error: "Mood log not found" });
    }
    
    res.json(moodLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE - Update a mood log
exports.updateMoodLog = async (req, res) => {
  try {
    const moodLog = await StudentMoodLog.findByPk(req.params.id);
    
    if (!moodLog) {
      return res.status(404).json({ error: "Mood log not found" });
    }
    
    await moodLog.update(req.body);
    
    // Fetch the updated mood log with related details
    const updatedMoodLog = await StudentMoodLog.findByPk(moodLog.id, {
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "code"],
        },
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["id", "name", "code"],
        },
      ],
    });
    
    res.json(updatedMoodLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE - Delete a mood log
exports.deleteMoodLog = async (req, res) => {
  try {
    const moodLog = await StudentMoodLog.findByPk(req.params.id);
    
    if (!moodLog) {
      return res.status(404).json({ error: "Mood log not found" });
    }
    
    await moodLog.destroy();
    res.json({ message: "Mood log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS - Toggle status of a mood log
exports.toggleStatus = async (req, res) => {
  try {
    const moodLog = await StudentMoodLog.findByPk(req.params.id);
    
    if (!moodLog) {
      return res.status(404).json({ error: "Mood log not found" });
    }
    
    moodLog.status = !moodLog.status;
    await moodLog.save();
    
    // Fetch the updated mood log with related details
    const updatedMoodLog = await StudentMoodLog.findByPk(moodLog.id, {
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "code"],
        },
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["id", "name", "code"],
        },
      ],
    });
    
    res.json(updatedMoodLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

