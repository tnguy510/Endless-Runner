//Current Issues:

//To Do before turn in 
//Replace object placeholder art
//Animate Gracie throw item with a texture atlas(leshylabs)
//Make sure damage is set to 3
//Add SFXs

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
var keyJUMP, keySHIFT, keyENTER, keyESC;
//GAME OVER flag
let gameOver = false;
var highScore = 0

//display score
let scoreConfig = {
    fontFamily: 'Permanent Marker',
    fontSize: '28px',
    color: '#FFFFFF',
    align: 'left',
    padding: {
        top: 5,
        bottom: 5,
    },
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