var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(2017,function(){
    console.log('Listening on '+server.address().port);
});

server.lastPlayderID = 0;

io.on('connection',function(socket){
    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400),
            rotationX: 0,
            rotationY: 0,
            xLocation: 0,
            yLocation: 0,
            moving: false
        };

        socket.emit('addallplayers',getAllPlayers());
        socket.emit('sendlocalplayerdata',socket.player);
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('newplayerrotation',function(id,rotationX,rotationY){
            socket.player.rotationX = rotationX;
            socket.player.rotationY = rotationY;
            socket.emit('setallplayers',getAllPlayers());
        });

        socket.on('playerstartmoving',function(id){
            socket.player.moving = true;
            socket.emit('setallplayers',getAllPlayers());
        });

        socket.on('playerstopmoving',function(id,xLocation,yLocation){
            socket.player.moving = false;
            socket.player.xLocation = xLocation;
            socket.player.yLocation = yLocation;
            socket.emit('setallplayers',getAllPlayers());
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}