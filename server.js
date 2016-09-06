
//Imports the module express
var express = require('express');

//creates the express application
var app = express();
//Creates the server on port 3000
var server = app.listen(3000);

//use the folder 'public'
app.use(express.static('public'));

console.log("Server is up");

//Sets up socket to use
var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('New connection' + socket.id);

  socket.on('mouse', mouseMsg);

  //logs  the object data from objects called 'mouse'
  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }

}
