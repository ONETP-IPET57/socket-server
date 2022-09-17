const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Socket server</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  const createdAlert = (msg) => {
    socket.broadcast.emit('newIncomingAlert', msg);
  };

  socket.on('createdAlert', createdAlert);

  const createdLocation = (msg) => {
    socket.broadcast.emit('newIncomingLocation', msg);
  };

  socket.on('createdLocation', createdLocation);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
