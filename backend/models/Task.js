const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Without Priority"],
    default: "Low",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
