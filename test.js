const connectDB = require('./backend/database');
const Task = require('./backend/models/task.model');
// Conectarse a la base de datos y guardar una tarea
const run = async () => {
  await connectDB(); // Esperar a que la conexión se establezca
  const nuevaTarea = new Task({
    title: 'Nueva Tarea',
    description: 'Descripción de la nueva tarea',
  });

  await nuevaTarea.save(); // Esperar a que se guarde la tarea
  console.log('Tarea guardada:', nuevaTarea);
};
// Ejecutar la función async
run().catch(console.error);