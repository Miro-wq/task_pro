const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:columnId/tasks", authenticateToken, createTask);
router.get("/:columnId/tasks", authenticateToken, getTasks);
router.put("/:columnId/tasks/:taskId", authenticateToken, updateTask);
router.delete("/:columnId/tasks/:taskId", authenticateToken, deleteTask);
module.exports = router;
