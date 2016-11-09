const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public'); // path.join() doesn't go into and then out of a directory, as just adding does
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); // this is what's happening behind the scenes in app.listen()
var io = socketIO(server);

// use middleware with app.use()
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined!'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // socket.emit does to a single connection, io does for all connections
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  });
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
