var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendPlayerRotation = function(id,rotationX,rotationY) {
    Client.socket.emit('newplayerrotation',id,rotationX,rotationY)
};

Client.startMoving = function(id) {
    Client.socket.emit('playerstartmoving',id)
};

Client.stopMoving = function(id, xLocation, yLocation) {
    Client.socket.emit('playerstopmoving',id,xLocation,yLocation)
};

Client.socket.on('sendlocalplayerdata',function(data){
    Game.giveLocalPlayerData(data.id,data.x,data.y);
});

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y,data.rotationX, data.rotationY);
});

Client.socket.on('addallplayers',function(data){
    console.log("Added player");
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].rotationX,data[i].rotationY);
    }
});

Client.socket.on('setallplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.setPlayer(data[i].id,data[i].rotationX,data[i].rotationY,data[i].xLocation,data[i].yLocation,data[i].moving);
    }
});

Client.socket.on('remove',function(id){
    Game.removePlayer(id);
});