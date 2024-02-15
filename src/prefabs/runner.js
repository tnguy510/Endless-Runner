class Runner extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        
        this.body.setSize(this.width / 2, this.height)
        this.x = x
        this.attackTimer = 3000
        this.setGravityY(500)
        this.body.setOffset(20, 0)

        scene.runnerFSM = new StateMachine('idle', {
            idle: new RunnerIdle(),
            attack: new RunnerAttack(),
            dead: new RunnerDead(),
        }, [scene, this]) 
    }
}

class RunnerIdle extends State {
    enter(scene, runner) { 
        runner.anims.play('runRun')
        if(gameOver == true) {
            this.stateMachine.transition('dead')
            return
        }
        //setting of when to send projectile
        scene.time.delayedCall(runner.attackTimer, () => {
            this.stateMachine.transition('attack')
            return
        })
    }
}

class RunnerAttack extends State {
    enter(scene, runner) {
        if(gameOver == true) {
            this.stateMachine.transition('dead')
            return
        }
        runner.anims.stop()
        
        //randomizing projectiles
        var projectileNum = Phaser.Math.Between(1, 2)
        if(projectileNum == 1){
            setGravity(scene, scene.dresser, -300, 0.25)
        }
        if(projectileNum == 2){
            setGravity(scene, scene.vase, -300, 1)
        }
        projectileNum = 0
        
        runner.anims.play('runAttack')    
        //runner.once('animationcomplete', () => {
        //    console.log("animation complete")
        //    this.stateMachine.transition('idle')
        //})
        scene.time.delayedCall(1000, () => {
            this.stateMachine.transition('idle')
            return
        })
    }
}

class RunnerDead extends State {
    enter(scene, runner) {
    }
}