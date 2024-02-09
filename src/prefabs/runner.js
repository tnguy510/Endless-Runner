class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, position) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.x = position; 

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
        // transition to jump if pressing space and on ground
        var random = Math.floor(Math.random() * 11)
        if(random == 1) {
            this.stateMachine.transition('attack')
            random = 0
            return
        }

    }
}

class RunnerAttack extends State {
    enter(scene, runner) {
        runner.anims.stop()
        runner.anims.play('runAttack')
    }

    execute(scene, runner){
        scene.projectile.position = 100//number here
    }


}