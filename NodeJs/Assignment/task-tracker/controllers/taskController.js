const { readTasks, writeTasks } = require("../models/taskModel");

// Get all tasks
exports.getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

// Filter by tag
exports.filterTasks = (req, res) => {
  const { tag } = req.query;
  const tasks = readTasks();
  if (!tag) return res.json(tasks);
  const filtered = tasks.filter((t) => t.tag.toLowerCase() === tag.toLowerCase());
  res.json(filtered);
};

// Add new task
exports.addTask = (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    ...req.body
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

// Update task
exports.updateTask = (req, res) => {
  let tasks = readTasks();
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id);

  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
};

// Delete task
exports.deleteTask = (req, res) => {
  let tasks = readTasks();
  const { id } = req.params;

  const filtered = tasks.filter((t) => t.id != id);
  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  writeTasks(filtered);
  res.json({ message: "Task deleted successfully" });
};
