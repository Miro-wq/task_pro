const express = require("express");
const { createColumn } = require("../controllers/columnsController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:boardId/columns", authenticateToken, createColumn);

module.exports = router;
