const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

// Board routes
router.post("/", boardController.createBoard);
router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoardById);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);
router.patch("/:id/toggle-status", boardController.toggleStatus);

module.exports = router;
