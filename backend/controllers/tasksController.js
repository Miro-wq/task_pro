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
    const { taskId } = req.params;
    const { columnId } = req.body;

    if (!taskId || !columnId) {
      return res
        .status(400)
        .json({ message: "TaskId and columnId are required ^_^" });
    }

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found ^_^" });

    task.columnId = columnId;
    await task.save();

    res.status(200).json({ message: "Task moved successfully ^_^", task });
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

const updateTask = async (req, res) => {
  try {
    const { columnId, taskId } = req.params;
    const updatedData = req.body;

    if (!columnId || !taskId) {
      return res
        .status(400)
        .json({ message: "Column ID and Task ID are required ^_^" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...updatedData, columnId },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found ^_^" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task ^_^", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required ^_^" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found ^_^" });
    }

    res.status(200).json({ message: "Task deleted successfully ^_^" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task ^_^", error });
  }
};

module.exports = { createTask, moveTask, getTasks, updateTask, deleteTask };
