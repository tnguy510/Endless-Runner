//Name: Trish Nguyen
//Monster Chase
//Hours Spent: 24
//Creative Tilt: While I do not believe I did things technically interesting I feel I incorporated a lot of elements.
//I have 3 finite state machines, a difficulty timer that has a little animation with fading out text(found in Play.js in the speedUp function)
//, and a ducking state for the player that changes their hitbox(found in player.js) and then goes back to the original height after letting go of the duck key
//The background music heard IS my own that I composed in a 8 bit tool called BeepBox, and I feel I did well to try and capture
//a fast pace chase composition.
//I will note, I can claim very little on the player character sprite. That was mostly done by my friend Max
//for a previous project we worked on together. Max gratiously allowed me to use it and I feel the very stark contrast 
//between that sprite and the runner helps sell the monster chase scene found in RPG Maker Horror games

'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL, 
    width: 840,
    height: 680,
    pixelArt: true,
    physics: {
        default: "arcade",
    },
    scene: [ Load, Credits, Menu, Play ]
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
    align: 'middle',
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