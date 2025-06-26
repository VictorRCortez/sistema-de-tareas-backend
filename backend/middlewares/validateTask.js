// middlewares/validateTask.js
const estadosPermitidos = ['pendiente', 'en progreso', 'completada'];

module.exports = (req, res, next) => {
  const { title, status } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'El título es obligatorio y debe ser texto.' });
  }

  if (status && !estadosPermitidos.includes(status)) {
    return res.status(400).json({ error: 'Estado inválido. Usa: pendiente, en progreso o completada.' });
  }

  next();
};
