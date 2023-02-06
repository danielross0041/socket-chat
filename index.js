var express = require('express');
var socket = require('socket.io')

// App setup
var app = express();
var server = app.listen(8000,function(){
    console.log("listening");
});

// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log("socket connection",socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit("typing",data);
    });
});