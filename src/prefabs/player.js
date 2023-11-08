class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, position) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setSize(this.width /2 , this.height)
        this.x = position; 
    }
    update() {
        //jump
        if(!this.notJumping) {
            if(keyJUMP.isDown){
                this.y += 10;
            }
        }
    }
}