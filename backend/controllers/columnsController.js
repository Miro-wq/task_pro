const Column = require("../models/Column");
const Board = require("../models/Board");

const createColumn = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res
        .status(400)
        .json({ message: "No board found with the provided boardId ^_^" });
    }

    const newColumn = await Column.create({ title, boardId });
    res.status(201).json(newColumn);
  } catch (error) {
    res.status(500).json({ message: "Error when creating new column", error });
  }
};

const updateColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required ^_^" });
    }

    const updatedColumn = await Column.findOneAndUpdate(
      columnId,
      { title },
      { new: true }
    );
    if (!updatedColumn) {
      return res.status(404).json({ message: "Column not found ^_^" });
    }
    res.status(200).json(updateColumn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ^_^" });
  }
};

const getColumns = async (req, res) => {
  try {
    // 1. Verificăm dacă boardul aparține userului logat
    const board = await Board.findOne({
      _id: req.params.boardId,
      userId: req.user.userId,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }

    const columns = await Column.find({ boardId: board._id });
    res.status(200).json(columns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { boardId, columnId } = req.params;

    // Verificăm dacă board-ul există și aparține user-ului logat
    const board = await Board.findOne({
      _id: boardId,
      userId: req.user.userId,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found or not yours." });
    }

    // Ștergem coloana
    const column = await Column.findByIdAndDelete(columnId);
    if (!column) {
      return res.status(404).json({ message: "Column not found ^_^" });
    }

    res.status(200).json({ message: "Column deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { createColumn, updateColumn, getColumns, deleteColumn };
