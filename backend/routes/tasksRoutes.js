const express = require("express");
const { createTask, getTasks } = require("../controllers/tasksController");
const {
  deleteColumn,
  updateColumn,
} = require("../controllers/columnsController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:columnId/tasks", authenticateToken, createTask);
router.get("/:columnId/tasks", authenticateToken, getTasks);
router.delete("/:columnId", authenticateToken, deleteColumn);
router.put("/:columnId", authenticateToken, updateColumn);
module.exports = router;
