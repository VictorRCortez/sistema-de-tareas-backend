require('dotenv').config({ path: '../.env' });

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Servir archivos estáticos desde /frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para servir index.html directamente
app.get('/tareas/index', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/view/index.html'));
});

const connectDB = require('./database');
const tasksRouter = require('./routes/tasks.routes');

connectDB();

app.use(cors());

app.use(express.json());

// Middleware para exponer io a los controladores
app.use((req, res, next) => {
  req.io = io;
  next();
});

require('./sockets')(io);


// Rutas
app.use('/api/tareas', tasksRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
