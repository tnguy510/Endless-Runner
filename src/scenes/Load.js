class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    preload(){
        //load images/tile sprites
        this.load.spritesheet('predator', './assets/Evil_Gracie_Sprite_sheet.png', {frameWidth:48, frameHeight: 72, 
        startFrame: 0, endframe: 11});
        this.load.image('background', './assets/background.png');
        this.load.image('floor', './assets/bg_floor.png');
        this.load.image('dresser', './assets/dresser placeholder.png')
        this.load.spritesheet('runner', './assets/runner placeholder.png', {frameWidth: 48, frameHeight: 60,
        startFrame: 0, endframe: 2})

    }

    create(){
        //animation config
        this.anims.create({
            key: 'playRun',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('predator', {
                frames: [6, 6, 7, 8, 8, 7]
            }),
        });
    }

    update(){
        this.scene.start("playScene");
    }
}