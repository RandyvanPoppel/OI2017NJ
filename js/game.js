var Game = {};
var playerID;
var xLocation;
var yLocation;

Game.init = function(){
    game.stage.disableVisibilityChange = true;

};

Game.preload = function() {
    game.load.image('player', 'assets/player.png');
    game.load.image('onlinePlayer', 'assets/onlinePlayer.png');
    game.load.image('map', 'assets/map.png');
};

Game.create = function(){
    game.world.setBounds(0, 0, 10000, 10000);
    game.add.sprite(0, 0, 'map');

    Game.playerMap = {};

    game.physics.startSystem(Phaser.Physics.ARCADE);

    Client.askNewPlayer();
};

Game.update = function (){
    resizeWindow();
    Client.sendPlayerRotation(playerID,game.input.mousePointer.x,game.input.mousePointer.y);
};

Game.giveLocalPlayerData = function(id, x, y){
    playerID = id;
    xLocation = x;
    yLocation = y;
    game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    //game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
};

Game.addNewPlayer = function(id,x,y, rotationX, rotationY){
    Game.playerMap[id] = game.add.sprite(x,y,'onlinePlayer', id);
    Game.playerMap[id].rotation = game.physics.arcade.angleToXY(Game.playerMap[id],rotationX,rotationY);
    Game.playerMap[id].anchor.setTo(0.5, 0.5);
};

Game.setPlayer = function(id, rotationX, rotationY){
    Game.playerMap[id].rotationX = rotationX;
    Game.playerMap[id].rotationY = rotationY;
    Game.playerMap[id].rotation = game.physics.arcade.angleToXY(Game.playerMap[id], rotationX, rotationY);
    Game.playerMap[id].anchor.setTo(0.5, 0.5);
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

function resizeWindow() {
    game.width = document.documentElement.clientWidth;
    game.height = document.documentElement.clientHeight;
    game.stage.width = document.documentElement.clientWidth;
    game.stage.height = document.documentElement.clientHeight;
    if (game.renderType === Phaser.WEBGL) {
        game.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    }
    game.camera.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    game.camera.setBoundsToWorld();
    game.scale.setShowAll();
    game.scale.refresh();
}