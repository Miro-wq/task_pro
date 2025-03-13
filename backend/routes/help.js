const express = require("express");
const router = express.Router();
const helpController = require("../controllers/helpController");

/**
 * @swagger
 * /api/help/send:
 *   post:
 *     summary: Send a help request email
 *     tags: [Help]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - comment
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               comment:
 *                 type: string
 *                 example: I need help with creating boards
 *     responses:
 *       200:
 *         description: Help request sent successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/send", helpController.sendHelpRequest);

module.exports = router;
