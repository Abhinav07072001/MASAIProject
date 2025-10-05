// Validates request body for create and update operations
module.exports = function validateTaskBody(req, res, next) {
const method = req.method.toUpperCase();
const { title, description, priority } = req.body;


// For POST (create), require title, description, priority
if (method === 'POST') {
if (!title || !description || !priority) {
return res.status(400).json({ message: 'Incomplete Data Received' });
}
}


// For PATCH, we allow partial updates but if priority provided, validate it
if (priority !== undefined) {
// must be exactly 'low' or 'medium' or 'high' (case-sensitive)
if (!['low', 'medium', 'high'].includes(priority)) {
return res.status(400).json({ message: 'Invalid priority value. Allowed: low, medium, high' });
}
}


// Additional optional checks: title and description when present must be non-empty strings
if (title !== undefined && typeof title !== 'string') {
return res.status(400).json({ message: 'Invalid title' });
}
if (description !== undefined && typeof description !== 'string') {
return res.status(400).json({ message: 'Invalid description' });
}


next();
};