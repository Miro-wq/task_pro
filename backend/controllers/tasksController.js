const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { columnId } = req.params;
    const { title, description, dueDate, priority } = req.body;

    if (!title || !columnId) {
      return res
        .status(400)
        .json({ message: "Title and columnId are required ^_^" });
    }

    const newTask = await Task.create({
      title,
      columnId,
      description,
      dueDate,
      priority,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when creating new task ^_^", error });
  }
};

const moveTask = async (req, res) => {
  try {
    const { taskId, newColumnId } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found ^_^" });

    task.columnId = newColumnId;
    await task.save();

    res.status(200).json({ message: "Task moved succesfully ^_^", task });
  } catch (error) {
    res.status(500).json({ error: "Server error ^_^" });
  }
};

const getTasks = async (req, res) => {
  try {
    const { columnId } = req.params;
    if (!columnId) {
      return res.status(400).json({ message: "No columnId provided ^_^" });
    }

    const tasks = await Task.find({ columnId });

    if (!tasks.length) {
      console.log("No tasks to show ^_^");
      return res.json([]);
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error ^_^", error });
  }
};

module.exports = { createTask, moveTask, getTasks };
