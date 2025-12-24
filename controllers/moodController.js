const { Mood, Emotion, Zone } = require("../models");

// CREATE
exports.createMood = async (req, res) => {
  try {
    // Generate a unique code if not provided
    if (!req.body.code) {
      req.body.code = (
        Math.floor(Math.random() * 90000000) + 10000000
      ).toString();
    }

    const mood = await Mood.create(req.body);

    // Fetch the created mood with emotion and zone details
    const moodWithDetails = await Mood.findByPk(mood.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
        {
          model: Zone,
          as: "zone",
          attributes: ["id", "name", "code", "description"],
        },
      ],
    });

    res.status(201).json(moodWithDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getMoods = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = {};
    
    // Filter by status if provided
    if (status !== undefined) {
      whereClause.status = status === "true" || status === true;
    }
    
    const moods = await Mood.findAll({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
        {
          model: Zone,
          as: "zone",
          attributes: ["id", "name", "code", "description"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findByPk(req.params.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
        {
          model: Zone,
          as: "zone",
          attributes: ["id", "name", "code", "description"],
        },
      ],
    });
    if (!mood) return res.status(404).json({ error: "Mood not found" });
    res.json(mood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateMood = async (req, res) => {
  try {
    const mood = await Mood.findByPk(req.params.id);
    if (!mood) return res.status(404).json({ error: "Mood not found" });

    await mood.update(req.body);

    // Fetch the updated mood with emotion and zone details
    const updatedMood = await Mood.findByPk(mood.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
        {
          model: Zone,
          as: "zone",
          attributes: ["id", "name", "code", "description"],
        },
      ],
    });

    res.json(updatedMood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByPk(req.params.id);
    if (!mood) return res.status(404).json({ error: "Mood not found" });
    await mood.destroy();
    res.json({ message: "Mood deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const mood = await Mood.findByPk(req.params.id);
    if (!mood) return res.status(404).json({ error: "Mood not found" });

    mood.status = !mood.status;
    await mood.save();

    // Fetch the updated mood with emotion and zone details
    const updatedMood = await Mood.findByPk(mood.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
        {
          model: Zone,
          as: "zone",
          attributes: ["id", "name", "code", "description"],
        },
      ],
    });

    res.json(updatedMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



