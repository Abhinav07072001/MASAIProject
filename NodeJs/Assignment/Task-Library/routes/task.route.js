const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');
const validate = require('../middleware/task.middleware');


// Create
router.post('/tasks', validate, controller.createTask);
// Read (all, with optional filters)
router.get('/tasks', controller.getTasks);
// Update
router.patch('/tasks/:id', validate, controller.updateTask);
// Delete (bulk by priority)
router.delete('/tasks', controller.deleteByPriority);


module.exports = router;