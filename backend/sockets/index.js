module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Cliente websocket conectado:', socket.id);

    socket.on('disconnect', () => {
      console.log('🔴 Cliente websocket desconectado:', socket.id);
    });  
    socket.on('nueva-tarea', (tarea) => {
      io.emit('tarea-agregada', tarea);
    });
      
    socket.on('eliminar-tarea', (id) => {
      io.emit('tarea-eliminada', id);
    });
      
        socket.on('editar-tarea', (tarea) => {
          io.emit('tarea-editada', tarea);
        });
    });
};