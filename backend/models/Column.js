const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
});

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
