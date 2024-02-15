class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    create(){
      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
      keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      this.face = this.add.image(game.config.width / 2, game.config.width / 2, 'title face').setScale(10)
      this.face.alpha = 0.5

        //show menu text
        this.add.text(game.config.width / 2, game.config.height/5, 'Monster Chase',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height * 2/ 5, 'Press Space to Jump',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height * 5/ 10, 'and Start Game',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height * 7/ 10, 'Press Shift to Duck',
          menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - borderUISize -
          borderPadding - borderPadding, 'Press ENTER for Credits', menuConfig).setOrigin(0.5)

      this.menuSFX = this.sound.add('menuSFX')
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
          this.menuSFX.play()
          this.scene.start("playScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
          this.menuSFX.play()
          this.scene.start("creditScene")
        }
    }
}