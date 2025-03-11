const express = require("express");
const {
  createColumn,
  getColumns,
  deleteColumn,
} = require("../controllers/columnsController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:boardId/columns", authenticateToken, createColumn);
router.get("/:boardId/columns", authenticateToken, getColumns);

//lipsea si ruta de stergere
router.delete("/:boardId/columns/:columnId", authenticateToken, deleteColumn);

module.exports = router;
