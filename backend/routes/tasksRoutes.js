const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/columns/{columnId}/tasks:
 *   post:
 *     summary: Create a new task in a column
 *     description: Creează un task nou în coloana specificată pe baza datelor furnizate în corpul cererii.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei în care se adaugă task-ul.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titlul task-ului.
 *               description:
 *                 type: string
 *                 description: Descrierea task-ului.
 *             required:
 *               - title
 *             example:
 *               title: "Task nou"
 *               description: "Descrierea task-ului nou"
 *     responses:
 *       201:
 *         description: Task-ul a fost creat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
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

router.post("/:columnId/tasks", authenticateToken, createTask);

/**
 * @swagger
 * /api/columns/{columnId}/tasks:
 *   get:
 *     summary: Get tasks from a column
 *     description: Returnează toate task-urile asociate coloanei specificate.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei.
 *     responses:
 *       200:
 *         description: Lista de task-uri.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Coloana nu a fost găsită.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column not found"
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

router.get("/:columnId/tasks", authenticateToken, getTasks);

/**
 * @swagger
 * /api/columns/{columnId}/tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     description: Actualizează datele unui task specific, în cadrul unei coloane, doar dacă task-ul aparține utilizatorului curent.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei din care face parte task-ul.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul task-ului care se dorește a fi actualizat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titlul task-ului.
 *               description:
 *                 type: string
 *                 description: Descrierea task-ului.
 *             example:
 *               title: "Task actualizat"
 *               description: "Descriere actualizată a task-ului"
 *     responses:
 *       200:
 *         description: Task-ul a fost actualizat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
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
 *         description: Task-ul nu a fost găsit sau nu aparține coloanei.
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

router.put("/:columnId/tasks/:taskId", authenticateToken, updateTask);

/**
 * @swagger
 * /api/columns/{columnId}/tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Șterge task-ul specificat din coloana indicată, doar dacă task-ul aparține utilizatorului curent.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei din care se dorește ștergerea task-ului.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul task-ului care se dorește a fi șters.
 *     responses:
 *       200:
 *         description: Task-ul a fost șters cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       404:
 *         description: Task-ul nu a fost găsit sau nu aparține coloanei.
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

router.delete("/:columnId/tasks/:taskId", authenticateToken, deleteTask);
module.exports = router;
