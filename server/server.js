const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); // path.join() doesn't go into and then out of a directory, as just adding does
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); // this is what's happening behind the scenes in app.listen()
var io = socketIO(server);

// use middleware with app.use()
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', { // socket.emit does to a single connection, io does for all connections
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime() // same as Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  });
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
