'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL, 
    width: 840,
    height: 680,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Menu, Credits, Play ]
}
const game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyJUMP, keyDOWN, keyENTER;
//GAME OVER flag
let gameOver = false;

//display score
let scoreConfig = {
    fontFamily: 'Permanent Marker',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 500
}

let menuConfig = {
    fontFamily: 'Permanent Marker',
    fontSize: '48px',
    color: '#FFFFFF',
    align: 'middle',
    padding: {
        top: 5,
        bottom: 5,
    }
}