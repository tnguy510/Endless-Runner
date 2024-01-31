class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, position) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        this.body.setSize(this.width /2 , this.height)
        this.x = position; 

        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            jump: new JumpState(),
            dead: new DeadState(),
        }, [scene, this]) 
    }
}

class IdleState extends State {
    enter(scene, player) {
        player.anims.play('playRun')
        player.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { space, shift } = scene.keys

        // transition to dead if hit object
        if(gameOver == true) {
            this.stateMachine.transition('dead')
            return
        }

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('jump')
            return
        }

    }
}

class JumpState extends State {
    enter(scene, player) {
        player.y += 10
        this.stateMachine.transition('jump')
    }
}

class DeadState extends State {
    enter(scene, player) {
        player.anims.stop()
    }
}