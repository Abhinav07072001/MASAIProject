const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');


// Create
router.post('/', controller.createTask);
// Read all with optional filters: ?status=pending&dueDate=2025-10-05
router.get('/', controller.getTasks);
// Read single
router.get('/:id', controller.getTaskById);
// Update
router.put('/:id', controller.updateTask);
// Partial update (status only or other partial fields)
router.patch('/:id', controller.updateTask);
// Delete
router.delete('/:id', controller.deleteTask);


module.exports = router;