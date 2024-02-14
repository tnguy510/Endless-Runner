class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
        // load audio
    }
    create(){

        //show menu text
        this.add.text(game.config.width / 2, game.config.height/3, 'Monster Chase',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press Space to Jump',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press Shift to Duck',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - borderUISize -
          borderPadding - borderPadding, 'Press ENTER for Credits', menuConfig).setOrigin(0.5)
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        //borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
          this.scene.start("playScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
          this.scene.start("creditScene")
        }
    }
}