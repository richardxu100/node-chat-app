var socket = io(); // we're making a request to open up a web socket

socket.on('connect', function () { // need to use function syntax b/c it won't display right on mobile or firefox
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
  console.log('Message: ', message);
  var li = jQuery('<li></li>'); // this creates an element
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
