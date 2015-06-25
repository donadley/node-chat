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

	// Sends a welcome message on the current socket
	socket.emit('chat message', 'Welcome')

	// Logs that a client on a specific socket has disconnected
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	// Logs message
	// sends message(msg) on socket with tag 'chat message'
	socket.on('chat message', function(msg){		
		console.log('message: ' + msg);
		io.emit('chat message', msg)
	    // socket.broadcast.emit('chat message', msg); //sends message to everyone except sender
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});