const express = require("express");
const { moveTask } = require("../controllers/tasksController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.put("/:taskId/move", authenticateToken, moveTask);
module.exports = router;
