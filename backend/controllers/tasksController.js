const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, columnId, description, dueDate, priority } = req.body;

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

module.exports = { createTask };
