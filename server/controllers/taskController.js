// server/controllers/taskController.js (Complete Implementation Structure)

const Task = require('../models/Task');
const asyncHandler = require('express-async-handler'); // Good practice for error handling

// @desc    Get user tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res) => {
  // Find all tasks associated with the authenticated user (req.user.id)
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

// @desc    Add new task
// @route   POST /api/tasks
// @access  Private
exports.addTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title for the task');
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description || '',
    user: req.user.id, // Associate the task with the logged-in user
  });

  res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Security check: Make sure the task belongs to the authenticated user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to update this task');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Returns the updated document
  });

  res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Security check: Make sure the task belongs to the authenticated user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized to delete this task');
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id, message: 'Task removed' });
});