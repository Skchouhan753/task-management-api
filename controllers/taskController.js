const Task = require('../models/taskModel');
const Joi = require('joi');

// Validation schema
const taskValidationSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED'),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
  dueDate: Joi.date().optional(),
});

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, sort, limit = 10, skip = 0 } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const tasks = await Task.find(filters)
      .sort(sort ? { [sort]: 1 } : {})
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
