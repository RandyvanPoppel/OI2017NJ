var game = new Phaser.Game(document.documentElement.clientWidth, document.documentElement.clientHeight, Phaser.AUTO, '');
game.state.add('Game',Game);
game.state.start('Game');