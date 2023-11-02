const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('stream', (dataUrl) => {
    // Maneja los datos del video recibidos del cliente
    // Puedes emitir los datos a otros clientes si es necesario
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

