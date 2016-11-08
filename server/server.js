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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined!',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', { // socket.emit does to a single connection, io does for all connections
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime() // same as Date.now()
    });

    // socket.broadcast.emit('newMessage', { // will only get received by other users
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  });
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
