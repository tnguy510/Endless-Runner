class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        this.body.setGravityY(50)
        this.body.setVelocity(-100)
        this.body.setBounce(0.5)
        //this.body.setDamping(0.5).setDrag(0.5)
    }
    update() {
        //this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        //if(this.x <= 0 - this.width) {
        //    this.x = game.config.width;
        //}
    }
}