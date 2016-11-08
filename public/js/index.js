var socket = io(); // we're making a request to open up a web socket

socket.on('connect', function () { // need to use function syntax b/c it won't display right on mobile or firefox
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
  console.log('Message: ', message);
});
