const express = require("express");
const {
  createColumn,
  getColumns,
} = require("../controllers/columnsController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:boardId/columns", authenticateToken, createColumn);
router.get("/:boardId/columns", authenticateToken, getColumns);

module.exports = router;
