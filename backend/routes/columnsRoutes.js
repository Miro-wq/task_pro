const express = require("express");
const {
  createColumn,
  getColumns,
  deleteColumn,
  updateColumn,
} = require("../controllers/columnsController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:boardId/columns", authenticateToken, createColumn);
router.get("/:boardId/columns", authenticateToken, getColumns);

//ruta de stergere
router.delete("/:boardId/columns/:columnId", authenticateToken, deleteColumn);

//ruta de update
router.put("/:boardId/columns/:columnId", authenticateToken, updateColumn);

module.exports = router;
