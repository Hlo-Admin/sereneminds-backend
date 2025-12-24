const { Zone, Emotion } = require("../models");

// CREATE
exports.createZone = async (req, res) => {
  try {
    // Generate a unique code if not provided
    if (!req.body.code) {
      req.body.code = (
        Math.floor(Math.random() * 90000000) + 10000000
      ).toString();
    }

    const zone = await Zone.create(req.body);

    // Fetch the created zone with emotion details
    const zoneWithEmotion = await Zone.findByPk(zone.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
      ],
    });

    res.status(201).json(zoneWithEmotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getZones = async (req, res) => {
  try {
    const zones = await Zone.findAll({
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findByPk(req.params.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
      ],
    });
    if (!zone) return res.status(404).json({ error: "Zone not found" });
    res.json(zone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateZone = async (req, res) => {
  try {
    const zone = await Zone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ error: "Zone not found" });

    await zone.update(req.body);

    // Fetch the updated zone with emotion details
    const updatedZone = await Zone.findByPk(zone.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
      ],
    });

    res.json(updatedZone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteZone = async (req, res) => {
  try {
    const zone = await Zone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ error: "Zone not found" });
    await zone.destroy();
    res.json({ message: "Zone deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const zone = await Zone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ error: "Zone not found" });

    zone.status = !zone.status;
    await zone.save();

    // Fetch the updated zone with emotion details
    const updatedZone = await Zone.findByPk(zone.id, {
      include: [
        {
          model: Emotion,
          as: "emotion",
          attributes: ["id", "name", "code"],
        },
      ],
    });

    res.json(updatedZone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
