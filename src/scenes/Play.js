class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    create() {
        //place tile sprite
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0,0);
        this.floor = this.physics.add.sprite(0, 0, 'floor').setOrigin(0,0);
        this.floor.setSize(game.config.width, game.config.height / 8)
        this.floor.setOffset(0, game.config.height / 1.1)
        this.floor.body.setImmovable(true)

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);
        
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        //keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //add predator
        this.player = new Player(this, game.config.width + borderUISize*2, borderUISize*7, 'predator', 0, 40).setOrigin(0, 0);
        this.player.setScale(3)

        this.projectile = new Projectile(this, game.config.width * 8 / 10, game.config.height * 4 / 5, 'dresser', 0)//.setOrigin(0, 0);
        this.projectile.setScale(0.5)

        // add prey (runner)
        this.prey = new Runner(this, game.config.width/2, game.config.height - borderUISize -
        borderPadding, 'runner').setOrigin(0.5,0);
        this.prey.setScale(0.5)

        this.physics.add.collider(this.player, this.projectile, this.damageCollision, null, this)
            //simple collider that stops player from overlapping with floor
        this.physics.add.collider(this.player, this.floor)
        this.physics.add.collider(this.projectile, this.floor)

        //initialize score
        this.p1Score = 0;

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,
            this.p1Score, scoreConfig);
        console.log(gameOver)

    }

    update() {
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.scene.restart();
        }
        //if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //   this.scene.start("menuScene");
        //}
        this.background.tilePositionX -= 4;
        if(!gameOver){
            this.playerFSM.step()
            //this.runner.step()
        }
    }

    damageCollision(player, projectile){
        gameOver = true;
        console.log(gameOver)
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
        scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
        scoreConfig).setOrigin(0.5);
    }

 }