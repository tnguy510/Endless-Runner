class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.x = x
        this.y = y
    }
}

function setGravity(scene, projectile, x, y){
    projectile.x = x
    projectile.y = y
    projectile.body.setGravityY(50)
    projectile.body.setVelocity(-100)
    projectile.body.setBounce(0.5)
}