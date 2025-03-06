const express = require("express");
const { createTask, moveTask } = require("../controllers/tasksController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:columnId/tasks", authenticateToken, createTask);
router.put("/:columnId/tasks/move", authenticateToken, moveTask);

module.exports = router;
