const express = require("express");
const { moveTask } = require("../controllers/tasksController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/tasks/{taskId}/move:
 *   put:
 *     summary: Move a task to another column
 *     description: Mută task-ul specificat la o altă coloană și/sau poziție, doar dacă task-ul aparține utilizatorului autentificat.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul task-ului care se dorește a fi mutat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetColumnId:
 *                 type: string
 *                 description: ID-ul coloanei țintă în care task-ul va fi mutat.
 *               newPosition:
 *                 type: integer
 *                 description: Noua poziție a task-ului în cadrul coloanei.
 *             example:
 *               targetColumnId: "612e3b5d8f0c8b0012345689"
 *               newPosition: 1
 *     responses:
 *       200:
 *         description: Task-ul a fost mutat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task moved successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Cerere invalidă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       404:
 *         description: Task-ul nu a fost găsit sau nu aparține utilizatorului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.put("/:taskId/move", authenticateToken, moveTask);
module.exports = router;
