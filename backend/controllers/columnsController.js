const Column = require("../models/Column");
const Board = require("../models/Board");

const createColumn = async (req, res) => {
  try {
    const { title, boardId } = req.body;

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

module.exports = { createColumn };
