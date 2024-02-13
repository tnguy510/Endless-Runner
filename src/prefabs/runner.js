class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.x = x
        this.attackTimer = 3000  

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
        //runner.anims.stop()
        //setGravity(scene, scene.projectile, game.config.width * 8 / 10, game.config.height * 4 / 5)
        scene.time.delayedCall(runner.attackTimer, () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, runner){
        setGravity(scene, scene.projectile, game.config.width * 8 / 10, game.config.height * 4 / 5)
        
    }


}