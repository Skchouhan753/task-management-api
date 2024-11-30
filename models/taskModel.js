const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
    default: "TODO",
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
  },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
