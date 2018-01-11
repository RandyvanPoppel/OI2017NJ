var Game = {};
var playerID;
var xLocation;
var yLocation;
var wKey;
var moving;

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

    moving = false;
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    Client.askNewPlayer();
};

Game.update = function (){
    resizeWindow();
    Client.sendPlayerRotation(playerID,game.input.mousePointer.x,game.input.mousePointer.y);
    if(wKey.isDown)
    {
        moving = true;
        Client.startMoving(playerID);
    }
    if(wKey.isUp && moving)
    {
        moving = false;
        Client.stopMoving(playerID, xLocation, yLocation);
    }
};

Game.giveLocalPlayerData = function(id, x, y){
    playerID = id;
    xLocation = x;
    yLocation = y;
};

Game.addNewPlayer = function(id,x,y, rotationX, rotationY){
    Game.playerMap[id] = game.add.sprite(x,y,'onlinePlayer', id);
    Game.playerMap[id].rotation = game.physics.arcade.angleToXY(Game.playerMap[id],rotationX,rotationY);
    Game.playerMap[id].anchor.setTo(0.5, 0.5);
};

Game.setPlayer = function(id, rotationX, rotationY, xLocation, yLocation, moving){
    game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    Game.playerMap[id].rotationX = rotationX;
    Game.playerMap[id].rotationY = rotationY;
    Game.playerMap[id].rotation = game.physics.arcade.angleToXY(Game.playerMap[id], rotationX, rotationY);
    Game.playerMap[id].anchor.setTo(0.5, 0.5);

    if(moving) {
        Game.playerMap[id].rotation = game.physics.arcade.moveToXY(Game.playerMap[id], rotationX, rotationY, 40);
    }

    if(Game.playerMap[id].moving != moving && !moving) {
        if(moving)
        {
            Game.playerMap[id].rotation = game.physics.arcade.moveToXY(Game.playerMap[id], rotationX, rotationY, 40);
            //Game.playerMap[id].rotation = game.physics.arcade.moveToXY(rotationX, rotationY, 200);
            //game.physics.arcade.accelerationFromRotation(Game.playerMap[id].rotation, 200, Game.playerMap[id].body.acceleration);
            //Game.playerMap[id].body.velocity.setTo(0,0);
        }
        else
        {
            Game.playerMap[id].rotation = game.physics.arcade.moveToXY(Game.playerMap[id], rotationX, rotationY, 0);
            //game.physics.arcade.accelerationFromRotation(Game.playerMap[id].rotation, 0, Game.playerMap[id].body.acceleration);
            Game.playerMap[id].xLocation = xLocation;
            Game.playerMap[id].yLocation = yLocation;
            Game.playerMap[id].body.x = xLocation;
            Game.playerMap[id].body.y = yLocation;
        }
    }
    Game.playerMap[id].moving = moving;
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