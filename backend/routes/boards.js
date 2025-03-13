const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const { authenticateToken } = require("../middleware/auth");
const Task = require("../models/Task");
const Column = require("../models/Column");

/**
 * @swagger
 * /boards/create:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Project Board"
 *                 description: The name of the board
 *               icon:
 *                 type: string
 *                 example: "⚡️"
 *                 description: Optional icon for the board
 *               background:
 *                 type: string
 *                 example: "bg1"
 *                 description: Optional background identifier
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board created successfully"
 *                 board:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the new board
 *                     name:
 *                       type: string
 *                     userId:
 *                       type: string
 *                       description: The ID of the user who created the board
 *                     icon:
 *                       type: string
 *                       description: The icon (if provided)
 *                     background:
 *                       type: string
 *                       description: The background (if provided)
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the board was created
 *                 columns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the created column
 *                       title:
 *                         type: string
 *                         description: The name of the column (e.g. "To Do", "In Progress", "Done")
 *                       boardId:
 *                         type: string
 *                         description: The board ID to which this column belongs
 *       400:
 *         description: Board name is required
 *       500:
 *         description: Server error
 */

// POST /api/boards/create
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { name, icon, background } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }

    // userId luat din authenticateToken (vezi middleware/auth.js)
    const newBoard = new Board({
      name,
      userId: req.user.userId,
      icon,
      background,
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

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get User whiteboards
 *     description: Returns all whiteboards associated with the authenticated user.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's list of boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

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

/**
 * @swagger
 * /api/boards/{boardId}:
 *   delete:
 *     summary: Delete the board and related data
 *     description: Deletes the specified board and all associated columns and tasks, only if the board belongs to the current user.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board you want to delete.
 *     responses:
 *       200:
 *         description: The board and related data have been successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board and related data deleted successfully"
 *       404:
 *         description: The board was not found or does not belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board not found or not yours"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

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
    await Column.deleteMany({ boardId });
    await Task.deleteMany({ boardId });

    res.json({ message: "Board and related data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/boards/{boardId}:
 *   put:
 *     summary: Board update
 *     description: Updates the name, icon, and background of a board, but only if it belongs to the current user.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board that you want to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the board.
 *               icon:
 *                 type: string
 *                 description: New icon for the board.
 *               background:
 *                 type: string
 *                 description: New wallpaper for the board.
 *             example:
 *               name: "Updated Board"
 *               icon: "new-icon.png"
 *               background: "new-background.jpg"
 *     responses:
 *       200:
 *         description: The board has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board updated successfully"
 *                 board:
 *                   $ref: '#/components/schemas/Board'
 *       400:
 *         description: The name of the board is mandatory.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board name is required"
 *       404:
 *         description: The board was not found or does not belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board not found or not yours"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.put("/:boardId", authenticateToken, async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name, icon, background } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: boardId, userId: req.user.userId },
      { name, icon, background },
      { new: true } // return la documentul actualizat
    );
    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found or not yours" });
    }
    res
      .status(200)
      .json({ message: "Board updated successfully", board: updatedBoard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
