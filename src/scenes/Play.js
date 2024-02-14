class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    create() {
        //place tile sprite
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0,0)
        this.floor = this.physics.add.sprite(0, 0, 'floor').setOrigin(0,0);
        this.floor.setSize(game.config.width, game.config.height)
        this.floor.setOffset(0, game.config.height / 1.1)
        this.floor.body.setImmovable(true)

        //background noise logic
        this.backgroundMusic = this.sound.add('chase music')
        this.backgroundMusic.loop = true
        this.backgroundMusic.play()
        
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //add predator
        this.player = new Player(this, game.config.width / 3, borderUISize*7, 'predator', 0)
        this.player.setScale(3)

        this.dresser = new Projectile(this, 0, 0, 'dresser', 0)//.setOrigin(0, 0);
        this.dresser.setScale(0.5)

        this.vase = new Projectile(this, 0, 0, 'vase', 0)
        this.vase.setScale(0.3)

        // add prey (runner)
        this.runner = new Runner(this, game.config.width * 4 / 5, game.config.height * 6 / 8, 'runner', 0)
        this.runner.setScale(2)

        this.projectiles = this.add.group([this.dresser, this.vase])

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);

        this.physics.add.collider(this.player, this.projectiles, this.damageCollision, null, this)
            //simple collider that stops player from overlapping with floor
        this.physics.add.collider(this.player, this.floor)
        this.physics.add.collider(this.runner, this.floor)
        this.physics.add.collider(this.projectiles, this.floor)


        //initialize score
        this.score = 0;
        gameOver = false;
        this.damage = 0

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,
            this.p1Score, scoreConfig);

    }

    update() {
        if(this.damage >= 3){
            gameOver = true;
            this.playerFSM.step()
            this.runnerFSM.step()
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press Space to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5);
        }

        if(this.projectiles.x == 0){
            this.score++
            this.projectiles.x = game.config.width + 100
            this.projectiles.body.setVelocityX(0)
            console.log(this.score)
        }
          // check key input for restart
        if (gameOver && Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            this.scene.restart();
        }
        //if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //   this.scene.start("menuScene");
        //}
        this.background.tilePositionX -= 4;
        if(!gameOver){
            this.playerFSM.step()
            this.runnerFSM.step()
        }
    }

    damageCollision(player, projectile){
        this.damage++
        this.playerFSM.step()
        player.setVelocity(-80)
        this.time.delayedCall(1000, () => {
            player.setVelocity(0)
        })
        //player.x -= game.config.width / 8
        projectile.x = game.config.width + 100
        projectile.body.setVelocity(0)
    }

 }