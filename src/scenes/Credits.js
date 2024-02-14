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
        this.add.text(0, game.config.height/ 10, 'Background Music by Trish Nguyen', creditConfig).setOrigin(0)
        this.add.text(0, game.config.height*2 / 10, 'Monster/Evil Gracie Sprites by Trish Nguyen', creditConfig).setOrigin(0)
        this.add.text(0, game.config.height*3 / 10, 'and Maximilian Almaguer', creditConfig).setOrigin(0)
        //this.add.text(0, game.config.height*4 / 10, 'Wooden Floor by CC0 Public Domain', creditConfig).setOrigin(0)
        //this.add.text(0, game.config.height*5 / 10, 'Door sound by THE_bizniss on Freesound.org', creditConfig).setOrigin(0)
        //this.add.text(0, game.config.height*6 / 10, 'Flourescent lights sound by mmaruska on Freesound.org', creditConfig).setOrigin(0)
        //this.add.text(0, game.config.height*7 / 10, 'Creaking sound by kletton97 on freesound', creditConfig).setOrigin(0)
        this.add.text(0, game.config.height*8 / 10, 'Code and other Images by Trish Nguyen', creditConfig).setOrigin(0)
        
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
