const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const logger = require('./log');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Socket server</h1>');
});

io.on('connection', (socket) => {
  logger.debug('a user connected');
  const createdAlert = (msg) => {
    socket.broadcast.emit('newIncomingAlert', msg);
    logger.debug('emiting newIncomingAlert msg');
  };

  socket.on('createdAlert', createdAlert);

  const createdLocation = (msg) => {
    socket.broadcast.emit('newIncomingLocation', msg);
    logger.debug('emiting newIncomingLocation msg');
  };

  socket.on('createdLocation', createdLocation);

  const createdBlueCodeAlert = (msg) => {
    socket.broadcast.emit('newIncomingBlueCodeAlert', msg);
    logger.debug('emiting newIncomingBlueCodeAlert msg');
  };

  socket.on('createdBlueCodeAlert', createdBlueCodeAlert);

  const createdConfirmNurse = (msg) => {
    socket.broadcast.emit('newIncomingConfirmNurse', msg);
    logger.debug('emiting newIncomingConfirmNurse msg');
  };

  socket.on('createdConfirmNurse', createdConfirmNurse);
});

server.listen(3000, () => {
  logger.debug('listening on *:3000');
});
