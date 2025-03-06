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

// GET /api/boards/:boardId/tasks
// pt sarcinile (tasks) din boardul specificat
router.get("/:boardId/tasks", authenticateToken, async (req, res) => {
  try {
    // 1. Verificăm dacă boardul aparține userului logat
    const board = await Board.findOne({
      _id: req.params.boardId,
      userId: req.user.userId,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }

    const tasks = await Task.find({ boardId: board._id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/boards/:boardId/tasks
// sarcina noua pentru boardul specificat
router.post("/:boardId/tasks", authenticateToken, async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.boardId,
      userId: req.user.userId,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }

    const { title, description, status, priority, dueDate } = req.body;

    // creeare task
    const newTask = new Task({
      boardId: board._id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/boards/:boardId/tasks/:taskId
// actualizare task (schimbă statusul sau etc.)
router.put("/:boardId/tasks/:taskId", authenticateToken, async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.boardId,
      userId: req.user.userId,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }

    // actualizare task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.taskId, boardId: board._id },
      req.body, // conține {title, description, status, samd}
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/boards/:boardId/tasks/:taskId
router.delete(
  "/:boardId/tasks/:taskId",
  authenticateToken,
  async (req, res) => {
    try {
      const board = await Board.findOne({
        _id: req.params.boardId,
        userId: req.user.userId,
      });
      if (!board) {
        return res
          .status(404)
          .json({ message: "Board not found or not yours" });
      }

      const deletedTask = await Task.findOneAndDelete({
        _id: req.params.taskId,
        boardId: board._id,
      });

      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

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
    res.json({ message: "Board deleted successfully", board: deletedBoard });
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
