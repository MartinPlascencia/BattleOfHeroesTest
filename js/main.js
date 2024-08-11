
var game;
var gameHeight = 720;
var gameWidth = Math.round(gameHeight * (window.innerWidth / window.innerHeight));
var screen = {};

window.onload = function(){
    var gameConfig = {
        backgroundColor: "#000000",
        scene:[preloaderIntro,loginScene, mapScene, gameScene],
        type: Phaser.AUTO,
        scale:{
            mode: Phaser.Scale.FIT,
            parent:'game',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width:gameWidth,
            height:gameHeight,
            //height:960,
        },
        dom: {
            createContainer: true
        },
    }
    
    game = new Phaser.Game(gameConfig);
    gameUtils.addCloseCallback();
    gameUtils.loadLocalData();
    setScreen();
    window.focus();
}

function setScreen(){
    screen.width = game.scale.gameSize.width;
    screen.height = game.scale.gameSize.height;
    screen.centerX = screen.width * 0.5;
    screen.centerY = screen.height * 0.5;
}