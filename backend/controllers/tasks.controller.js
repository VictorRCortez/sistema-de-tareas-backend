const Task = require('../models/task.model');

// GET /tareas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// GET /tareas/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

// POST /tareas
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const newTask = new Task({
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'pendiente'
    });

    // Asignar fechas según el estado inicial
    if (newTask.status === 'en progreso') {
      newTask.startedAt = new Date();
    }
    if (newTask.status === 'completada') {
      newTask.startedAt = new Date();
      newTask.completedAt = new Date();
    }

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
    req.io.emit('task-created', savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// PUT /tareas/:id
exports.updateTask = async (req, res) => {
  try {
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

        // ❌ Si la tarea ya está completada, no se permite editar el estado
        if (existingTask.status === 'completada' && req.body.status !== 'completada') {
          return res.status(400).json({ error: 'No se puede modificar una tarea completada.' });
        }

    const prevStatus = existingTask.status;
    existingTask.title = req.body.title || existingTask.title;
    existingTask.description = req.body.description || existingTask.description;
    existingTask.status = req.body.status || existingTask.status;

    // Asignar fechas si cambia el estado
    if (prevStatus !== 'en progreso' && existingTask.status === 'en progreso' && !existingTask.startedAt) {
      existingTask.startedAt = new Date();
    }

    if (prevStatus !== 'completada' && existingTask.status === 'completada' && !existingTask.completedAt) {
      if (!existingTask.startedAt) existingTask.startedAt = new Date(); // por si no pasó por "en progreso"
      existingTask.completedAt = new Date();
    }

    const updatedTask = await existingTask.save();
    res.json(updatedTask);
    req.io.emit('task-updated', updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// DELETE /tareas/:id
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
    req.io.emit('task-deleted', deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};
