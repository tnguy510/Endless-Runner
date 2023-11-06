class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, position) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.x = position; 
    }
    update() {
        //jump
        if(!this.notJumping) {
            if(keyJUMP.isDown){
                
            }
        }
    }
}