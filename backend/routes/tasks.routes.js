const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/tasks.controller');

const validateTask = require('../middlewares/validateTask')

const router = express.Router();

// GET /tareas
router.get('/', getTasks);

// GET /tareas/:id
router.get('/:id', getTaskById);

// POST /tareas
//uso de middleware
router.post('/', validateTask, createTask);

// PUT /tareas/:id 
//uso de middleware
router.put('/:id', validateTask, updateTask);

// DELETE /tareas/:id
router.delete('/:id', deleteTask);

module.exports = router;
