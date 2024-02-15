class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        this.body.setSize(this.width /3 , this.height)
        this.x = x; 
        this.setGravityY(500)
        this.originalheight = this.height

        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
            duck: new DuckState(),
            dead: new DeadState(),
        }, [scene, this]) 
    }
}

class IdleState extends State {
    enter(scene, player) {
        //if(player.height < player.originalheight){
        //    console.log("height check")
        //    player.body.setSize(player.width /3 , player.originalheight)
        //player.body.setSize(player.width /3 , player.height)
        //player.height = player.height
        player.anims.play('playRun')
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard objectl
        const { space, shift } = scene.keys

        // transition to dead if hit object
        if(gameOver == true) {
            this.stateMachine.transition('dead')
            return
        }

        // transition to jump if pressing space and on ground
        if(Phaser.Input.Keyboard.JustDown(space) && player.body.touching.down) {
            this.stateMachine.transition('jump')
            return
        }
        if(Phaser.Input.Keyboard.JustDown(shift) && player.body.touching.down){
            //player.body.setSize(player.width /3 , player.height / 2)
            this.stateMachine.transition('duck')
            return
        }

    }
}

class JumpState extends State {
    enter(scene, player) {
        player.setVelocityY(-400)
        this.stateMachine.transition('idle')
    }
}

class DuckState extends State {
    enter(scene, player) {
            console.log("duck")
            player.anims.play('playDuck')
            player.body.setSize(player.width /3 , player.height /2)
            player.body.setOffset(player.width /3, player.height / 2)
        }
        //player.body.setSize(player.width /3 , player.height)
    execute(scene, player){
        if(keySHIFT.isDown){
            return
        } else{
            player.body.setSize(player.width /3 , player.height)
            this.stateMachine.transition('idle')
        }
    }
}

class DeadState extends State {
    enter(scene, player) {
        player.setVelocityX(-300)
        player.anims.stop()
    }
}