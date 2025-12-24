const { Event, School } = require("../models");

// CREATE
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    const eventWithRelations = await Event.findByPk(event.id, {
      include: [{ model: School, as: "school" }],
    });
    res.status(201).json(eventWithRelations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getEvents = async (req, res) => {
  try {
    const { schoolId, type, status, dateFrom, dateTo } = req.query;
    const where = {};
    
    if (schoolId) where.schoolId = schoolId;
    if (type) where.type = type;
    if (status !== undefined) where.status = status === "true";
    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) where.date[require("sequelize").Op.gte] = dateFrom;
      if (dateTo) where.date[require("sequelize").Op.lte] = dateTo;
    }

    const events = await Event.findAll({
      where,
      include: [{ model: School, as: "school" }],
      order: [["date", "ASC"], ["time", "ASC"]],
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.update(req.body);
    const updatedEvent = await Event.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.destroy();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.status = !event.status;
    await event.save();

    const updatedEvent = await Event.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


