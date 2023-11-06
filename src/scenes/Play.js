class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.spritesheet('predator', './assets/Evil_Gracie_Sprite_sheet.png', {frameWidth:48, frameHeight: 72, 
        startFrame: 0, endframe: 11});
        //this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('background', './assets/background.png');
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth:64, frameHeight: 32,
        //startFrame: 0, endFrame: 9});

    }

    create() {
        //place tile sprite
        this.background = this.add.tileSprite(0, 0, 250, 180, 'background').setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);
        //  add prey (runner)
        //this.prey = new Runner(this, game.config.width/2, game.config.height - borderUISize -
        //borderPadding, 'runner').setOrigin(0.5,0);
        // define keys
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);


        //add predator
        this.player = new Player(this, game.config.width + borderUISize*6, borderUISize*4,
            'predator', 0, 30).setOrigin(0, 0);
            //(scene, x, y, texture, frame, position)

        //animation config
        this.anims.create({
            key: 'playRun',
            frames: this.anims.generateFrameNumbers('predator', {start: 6, end: 8, first: 6}),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Spooky',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,
            this.p1Score, scoreConfig);

        //GAME OVER flag
        this.gameOver = false;
    }

    update() {
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.scene.restart();
        }
        //if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //    this.scene.start("menuScene");
        //}
        this.background.tilePositionX -= 4;
        //if (!this.gameOver) {
          //  this.p1Rocket.update();
            //this.ship01.update();
            //this.ship02.update();
            //this.ship03.update();
        //}
        //check collision
        //if(this.checkCollision(this.player, this.object)) {
        //    this.p1Rocket.reset();
        //    this.shipExplode(this.ship03);
        //}
    }


 }