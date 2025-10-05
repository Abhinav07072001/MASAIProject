const Task = require('../models/Task');


exports.createTask = async (req, res) => {
try {
const { title, description, status, dueDate } = req.body;
if (!title) return res.status(400).json({ error: 'Title is required' });


const task = new Task({ title, description, status, dueDate });
await task.save();
res.status(201).json(task);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};
exports.getTasks = async (req, res) => {
try {
// Filtering by status and dueDate
const { status, dueDate } = req.query;
const filter = {};
if (status) filter.status = status;
if (dueDate) {
// accept dueDate as YYYY-MM-DD and treat it as "that day"
const day = new Date(dueDate);
if (!isNaN(day)) {
const start = new Date(day.setHours(0, 0, 0, 0));
const end = new Date(day.setHours(23, 59, 59, 999));
filter.dueDate = { $gte: start, $lte: end };
}
}
const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};
exports.getTaskById = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findById(id);
if (!task) return res.status(404).json({ error: 'Task not found' });
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};
exports.updateTask = async (req, res) => {
try {
const { id } = req.params;
const updates = req.body;
const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
if (!task) return res.status(404).json({ error: 'Task not found' });
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


exports.deleteTask = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findByIdAndDelete(id);
if (!task) return res.status(404).json({ error: 'Task not found' });
res.json({ message: 'Task deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};