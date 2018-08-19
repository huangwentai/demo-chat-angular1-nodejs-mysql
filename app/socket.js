function io_connect(server){
var io = require('socket.io')(server);



io.on('connection', function (socket){
	//io.emit('chat message', 'hi');

	socket.on('chat message', function(msg){
		console.log(msg);
		socket.broadcast.emit('chat message', msg);
	});
	socket.on('subscribe', function(room) {
	    console.log('joining room', room);
	    socket.join(room);
	});
	socket.on('say to someone', function(id, msg){
		console.log(msg)
	    socket.broadcast.to(id).emit('say to someone', msg);
	});
});
}
module.exports = io_connect;