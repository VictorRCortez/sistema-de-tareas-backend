const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/tasks.controller');

const router = express.Router();

// GET /tareas
router.get('/', getTasks);

// GET /tareas/:id
router.get('/:id', getTaskById);

// POST /tareas
router.post('/', createTask);

// PUT /tareas/:id
router.put('/:id', updateTask);

// DELETE /tareas/:id
router.delete('/:id', deleteTask);

module.exports = router;
