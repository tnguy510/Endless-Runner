class Credits extends Phaser.Scene {
    constructor(){
        super('creditScene')
    }
    create(){
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        let creditConfig = {
            fontFamily: 'Permanent Marker',
            fontSize: '25px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //credits
        this.add.text(game.config.width/2, game.config.height/ 10, 'Background Music by Trish Nguyen', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*3 / 10, 'Monster/Evil Gracie Sprites by Trish Nguyen', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*4 / 10, 'and Maximilian Almaguer', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*6 / 10, 'All Sound Effects by Trish Nguyen', creditConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height*7 / 10, 'Code and other Images by Trish Nguyen', creditConfig).setOrigin(0.5)
        
        //return to menu
        this.add.text(game.config.width/2, game.config.height - borderUISize -
        borderPadding - borderPadding, 'Press ENTER to go back to Main Menu', creditConfig).setOrigin(0.5)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.start('menuScene')
        }
        
    }

}
