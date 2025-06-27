module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Cliente websocket conectado:', socket.id);

    socket.on('disconnect', () => {
      console.log('🔴 Cliente websocket desconectado:', socket.id);
    });
  });
};