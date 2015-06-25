var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serving HTML file
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// listen on the connection event for incoming sockets
io.on('connection', function(socket){
	console.log('a user connected');
	socket.emit('chat message', 'Welcome')

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	// sends message on socket with tag 'chat message'
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});

	socket.on('chat message', function(msg){
  	//send an event to everyone example
		io.emit('chat message', msg)
	    // socket.broadcast.emit('chat message', msg); //for everyone except sender
	  });
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});