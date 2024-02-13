class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.x = x
        this.attackTimer = 300  

        scene.runnerFSM = new StateMachine('idle', {
            idle: new RunnerIdle(),
            attack: new RunnerAttack(),
        }, [scene, this]) 
    }
}

class RunnerIdle extends State {
    enter(scene, runner) {
        runner.anims.play('runRun')
    }

    execute(scene, runner) {
        //setting of when to send projectile
        scene.time.delayedCall(runner.attackTimer, () => {
            this.stateMachine.transition('attack')
            return
        })

    }
}

class RunnerAttack extends State {
    enter(scene, runner) {
        runner.anims.play('runAttack')
        runner.anims.stop()
        //this.stateMachine.transition('idle')
        scene.time.delayedCall(runner.attackTimer, () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, runner){
        scene.projectile.position = 480//number here
    }


}