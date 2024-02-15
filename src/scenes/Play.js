class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    create() {
        //place tile sprite
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0,0)

        this.floorPhysic = this.physics.add.sprite(0, 0, 'floorStatic').setOrigin(0,0);
        this.floorPhysic.setSize(game.config.width, game.config.height)
        this.floorPhysic.setOffset(0, game.config.height / 1.1)
        this.floorPhysic.body.setImmovable(true)

        this.floor = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'floorPillar').setOrigin(0,0)

        //background noise logic
        this.bgm = this.sound.add('chase music', {
            loop: true,
            volume: 0.75
        })
        this.bgm.play()
        
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


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
        this.attacktimerMax = 600

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
        this.physics.add.collider(this.player, this.floorPhysic)
        this.physics.add.collider(this.runner, this.floorPhysic)
        this.physics.add.collider(this.projectiles, this.floorPhysic)


        //initialize score
        this.score = 0;
        gameOver = false;
        this.damage = 0

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,
            this.score, scoreConfig);

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.speedUp,
            callbackScope: this,
            loop: true
        })

    }

    update() {
        if(this.damage >= 1 && !gameOver){
            gameOver = true;
            if(highScore < this.score) {
                highScore = this.score
            }
            this.playerFSM.step()
            this.runnerFSM.step()
            this.add.text(game.config.width / 2, game.config.height/3, 'GAME OVER',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height/ 2, 'BEST SCORE: ' + highScore,
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + game.config.height/ 8, 'Press ENTER to Restart',
            menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'or ESC for Menu',
            menuConfig).setOrigin(0.5);
        }

          // check key input for restart
        if (gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.bgm.stop()
            this.scene.restart();
        }
        if (gameOver && Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.bgm.stop()
            this.scene.start("menuScene");
        }
        
        this.background.tilePositionX += 5;
        this.floor.tilePositionX += 5
        if(!gameOver){
            this.playerFSM.step()
            this.runnerFSM.step()
            this.scoreLeft.text = this.score
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

    
    speedUp(){
        this.score++
        if(this.score % 5 == 0) {
            //this.sound.play('clang', { volume: 0.5 })         // play clang to signal speed up
            if(this.runner.attackTimer >= this.attacktimerMax) {     // increase attack speed
                this.runner.attackTimer -= 25
            }
        }
    }
 }