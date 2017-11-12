import path from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import { generateMessage, generateLocationMessage } from './utils/message';
import { isRealString } from './utils/validation';
import { Users } from './utils/users';

const publicPath = path.join(__dirname, '../public'); // path.join() doesn't go into and then out of a directory, as just adding does
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); // this is what's happening behind the scenes in app.listen()
var io = socketIO(server);
var users = new Users();

// use middleware with app.use()
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    const room = params.room.toLowerCase();
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    if (users.users.find(u => u.name.toLowerCase() === params.name.toLowerCase() && u.room === room)) {
      return callback('Name is already taken in this chat. Please pick another one!');
    }

    socket.join(room);
    users.removeUser(socket.id); // remove the user from any potential previous room
    users.addUser(socket.id, params.name, room);
    // socket.leave('The Office Fans');

    // io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit()
    // socket.emit

    io.to(room).emit('updateUserList', users.getUserList(room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      // socket.emit does to a single connection, io does for all connections
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}/`);
});
