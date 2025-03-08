const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const { authenticateToken } = require("../middleware/auth");
const Task = require("../models/Task");
const Column = require("../models/Column");

// POST /api/boards/create
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }

    // userId luat din authenticateToken (vezi middleware/auth.js)
    const newBoard = new Board({
      name,
      userId: req.user.userId,
    });
    await newBoard.save();

    //pentru adaugarea de coloane implicite la crearea unui board nou ^_^
    const defaultColumns = ["To Do", "In Progress", "Done"];

    const columns = await Promise.all(
      defaultColumns.map(async (colName) => {
        const column = new Column({ title: colName, boardId: newBoard._id });
        await column.save();
        return column;
      })
    );

    res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
      columns,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/boards
router.get("/", authenticateToken, async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.userId });
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/boards/:boardId
router.delete("/:boardId", authenticateToken, async (req, res) => {
  try {
    const { boardId } = req.params;
    // doar dacă aparține userului curent !!!!!!!!!!
    const deletedBoard = await Board.findOneAndDelete({
      _id: boardId,
      userId: req.user.userId,
    });
    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }
    // Ștergerea coloanelor și task-urilor aferente
    await Column.deleteMany({ boardId });
    await Task.deleteMany({ boardId });

    res.json({ message: "Board and related data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:boardId", authenticateToken, async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: boardId, userId: req.user.userId },
      { name },
      { new: true } // return la documentul actualizat
    );
    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }
    res.json({ message: "Board updated successfully", board: updatedBoard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
