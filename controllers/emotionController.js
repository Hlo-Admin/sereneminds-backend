const { Emotion } = require("../models");

// CREATE
exports.createEmotion = async (req, res) => {
  try {
    const emotion = await Emotion.create(req.body);
    res.status(201).json(emotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(emotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getEmotionById = async (req, res) => {
  try {
    const emotion = await Emotion.findByPk(req.params.id);
    if (!emotion) return res.status(404).json({ error: "Emotion not found" });
    res.json(emotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEmotion = async (req, res) => {
  try {
    const emotion = await Emotion.findByPk(req.params.id);
    if (!emotion) return res.status(404).json({ error: "Emotion not found" });
    await emotion.update(req.body);
    res.json(emotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteEmotion = async (req, res) => {
  try {
    const emotion = await Emotion.findByPk(req.params.id);
    if (!emotion) return res.status(404).json({ error: "Emotion not found" });
    await emotion.destroy();
    res.json({ message: "Emotion deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const emotion = await Emotion.findByPk(req.params.id);
    if (!emotion) return res.status(404).json({ error: "Emotion not found" });

    emotion.status = !emotion.status;
    await emotion.save();

    res.json(emotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
