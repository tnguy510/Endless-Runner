class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.x = x
        this.y = y
    }
}

function setGravity(scene, projectile, velocity, bounce){
    projectile.x = game.config.width * 8 / 10
    projectile.y = game.config.height * 4 / 5
    projectile.body.setGravityY(50)
    projectile.body.setVelocityX(velocity)
    projectile.body.setBounce(bounce)
}