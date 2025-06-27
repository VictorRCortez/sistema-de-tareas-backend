const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,  // Se asigna cuando cambia a "en progreso"
    default: null,
  },
  completedAt: {
    type: Date,  // Se asigna cuando cambia a "completada"
    default: null,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
