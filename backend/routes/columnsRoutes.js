const express = require("express");
const {
  createColumn,
  getColumns,
  deleteColumn,
  updateColumn,
} = require("../controllers/columnsController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/boards/{boardId}/columns:
 *   post:
 *     summary: Create a new column for the board
 *     description: Creează o nouă coloană în board-ul specificat pe baza datelor furnizate în corpul cererii.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Numele coloanei.
 *             example:
 *               name: "Noua coloană"
 *     responses:
 *       201:
 *         description: Coloana a fost creată cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
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

router.post("/:boardId/columns", authenticateToken, createColumn);

/**
 * @swagger
 * /api/boards/{boardId}/columns:
 *   get:
 *     summary: Get the board columns
 *     description: Returnează toate coloanele asociate board-ului specificat.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *     responses:
 *       200:
 *         description: Lista de coloane.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Column'
 *       404:
 *         description: Board-ul nu a fost găsit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board not found"
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

router.get("/:boardId/columns", authenticateToken, getColumns);

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}:
 *   delete:
 *     summary: Delete column
 *     description: Șterge coloana specificată din board-ul indicat, doar dacă aparține utilizatorului curent.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei care se dorește a fi ștearsă.
 *     responses:
 *       200:
 *         description: Coloana a fost ștearsă cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column deleted successfully"
 *       404:
 *         description: Coloana nu a fost găsită sau nu aparține board-ului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column not found or not yours"
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

//ruta de stergere
router.delete("/:boardId/columns/:columnId", authenticateToken, deleteColumn);

/**
 * @swagger
 * /api/boards/{boardId}/columns/{columnId}:
 *   put:
 *     summary: Update the column
 *     description: Actualizează datele coloanei specificate din board-ul indicat, doar dacă aparține utilizatorului curent.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei care se dorește a fi actualizată.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Noul nume al coloanei.
 *             example:
 *               name: "Coloană actualizată"
 *     responses:
 *       200:
 *         description: Coloana a fost actualizată cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column updated successfully"
 *                 column:
 *                   $ref: '#/components/schemas/Column'
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
 *         description: Coloana nu a fost găsită sau nu aparține board-ului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column not found or not yours"
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

//ruta de update
router.put("/:boardId/columns/:columnId", authenticateToken, updateColumn);

module.exports = router;
