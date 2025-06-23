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
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Enviamos la respuesta solo una vez

    req.io.emit('task-created', savedTask); // Emitimos después de enviar respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// PUT /tareas/:id
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(updatedTask); // Enviar primero la respuesta
    req.io.emit('task-updated', updatedTask); // Luego emitir evento
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
