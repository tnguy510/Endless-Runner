class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    preload(){
        //load images/tile sprites
        this.load.spritesheet('predator', './assets/Evil_Gracie_Sprite_sheet.png', {frameWidth:48, frameHeight: 72, 
        startFrame: 0, endframe: 11});
        //this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('background', './assets/background.png');
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth:64, frameHeight: 32,
        //startFrame: 0, endFrame: 9});
        this.load.image('dresser', './assets/dresser placeholder.png')

    }

    create(){
        this.scene.start("playScene");
    }
}