class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.spritesheet('rocket', './assets/Evil_Gracie_Sprite_sheet.png', {frameWidth:48, frameHeight: 72, 
        startFrame: 0, endframe: 11});
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth:64, frameHeight: 32,
        startFrame: 0, endFrame: 9});

    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 250, 180, 'background').setOrigin(0,0);
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
            borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);
        //  add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize -
        borderPadding, 'rocket').setOrigin(0.5,0);
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
            'spaceship', 0, 30).setOrigin(0, 0);

        //animation config
        this.anims.create({
            key: '',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
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

        //60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        //check collision
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }


 }