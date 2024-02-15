class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    preload(){
        this.load.path = './assets/'
        //load images/tile sprites
        this.load.spritesheet('predator', 'Evil_Gracie_Sprite_sheet.png', {frameWidth:48, frameHeight: 72, 
        startFrame: 0, endframe: 11});
        this.load.image('title face', 'title screen face.png')
        this.load.image('background', 'background.png');
        this.load.image('floorStatic', 'bg_floor.png');
        this.load.image('floorPillar', 'bg_floor_pillar.png');
        this.load.image('vase', 'vase.png')
        this.load.image('dresser', 'dresser.png')
        this.load.spritesheet('runner', 'london_life_chr_gracie.png', {frameWidth: 48, frameHeight: 72,
        startFrame: 0, endframe: 11})
        
        //load audio
        this.load.audio('chase music', 'Endless Runner Theme.wav')
        this.load.audio('damage', 'explosion.wav')
        this.load.audio('jump','jumpsfx.wav')
        this.load.audio('levelUp', 'powerUp.wav')
        this.load.audio('menuSFX', 'Start SFX.wav')
        this.load.audio('walkingSFX', 'walking.wav')

    }

    create(){
        // define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        //animation config
        this.anims.create({
            key: 'playRun',
            frameRate: 24,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('predator', {
                frames: [6, 6, 7, 8, 8, 7]
            }),
        });

        this.anims.create({
            key: 'playDuck',
            frameRate: 24,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('predator', {
                frames: [10, 9, 9, 11, 11, 10]
            }),
        });

        this.anims.create({
            key: 'runRun',
            frameRate: 24,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('runner', {
                frames: [6, 6, 7, 8, 8, 7]
            }),
        });

        this.anims.create({
            key: 'runAttack',
            frameRate: 16,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('runner', {
                frames: [3, 3, 4, 4, 4, 5, 3]
            }),
        });
    }

    update(){
        this.scene.start("menuScene");
    }
}