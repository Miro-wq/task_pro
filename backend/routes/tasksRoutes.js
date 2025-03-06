const express = require("express");
const { createTask } = require("../controllers/tasksController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/:columnId/tasks", authenticateToken, createTask);

module.exports = router;
