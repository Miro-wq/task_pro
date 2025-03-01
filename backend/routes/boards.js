const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const { authenticateToken } = require('../middleware/auth'); 

// POST /api/boards/create
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Board name is required' });
    }

    // userId luat din authenticateToken (vezi routes/auth.js)
    const newBoard = new Board({
      name,
      userId: req.user.userId, 
    });
    await newBoard.save();

    res.status(201).json({
      message: 'Board created successfully',
      board: newBoard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/boards
router.get('/', authenticateToken, async (req, res) => {
    try {
      const boards = await Board.find({ userId: req.user.userId });
      res.json(boards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // DELETE /api/boards/:boardId
  router.delete('/:boardId', authenticateToken, async (req, res) => {
    try {
      const { boardId } = req.params;
      // doar dacă aparține userului curent !!!!!!!!!!
      const deletedBoard = await Board.findOneAndDelete({
        _id: boardId,
        userId: req.user.userId,
      });
      if (!deletedBoard) {
        return res.status(404).json({ message: 'Board not found or not yours' });
      }
      res.json({ message: 'Board deleted successfully', board: deletedBoard });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
