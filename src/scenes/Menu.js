class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Load audio

        // Load menu images
        this.load.image('menuBackground', './assets/menuBackground.png');

    }

    create() {
        // Initialize menu
        this.menuBackground = this.add.tileSprite(0, 0, 480, 640, 'menuBackground').setOrigin(0, 0);

         // Define key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // Start play scene
            console.log('test');
            this.scene.start('playScene');
        }
    }
}