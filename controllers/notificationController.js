const { Notification, School } = require("../models");

// CREATE
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    const notificationWithRelations = await Notification.findByPk(notification.id, {
      include: [{ model: School, as: "school" }],
    });
    res.status(201).json(notificationWithRelations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getNotifications = async (req, res) => {
  try {
    const { schoolId, type, read, status } = req.query;
    const where = {};
    
    if (schoolId) where.schoolId = schoolId;
    if (type) where.type = type;
    if (read !== undefined) where.read = read === "true";
    if (status !== undefined) where.status = status === "true";

    const notifications = await Notification.findAll({
      where,
      include: [{ model: School, as: "school" }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    await notification.update(req.body);
    const updatedNotification = await Notification.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    await notification.destroy();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    notification.read = true;
    await notification.save();

    const updatedNotification = await Notification.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.json(updatedNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    notification.status = !notification.status;
    await notification.save();

    const updatedNotification = await Notification.findByPk(req.params.id, {
      include: [{ model: School, as: "school" }],
    });
    res.json(updatedNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


