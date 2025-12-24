const { Board } = require("../models");

// CREATE
exports.createBoard = async (req, res) => {
  try {
    // Generate a unique code if not provided
    if (!req.body.code) {
      req.body.code = Math.floor(Math.random() * 100000000).toString();
    }

    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ error: "Board not found" });
    await board.update(req.body);
    res.json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ error: "Board not found" });
    await board.destroy();
    res.json({ message: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ error: "Board not found" });

    board.status = !board.status;
    await board.save();

    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
