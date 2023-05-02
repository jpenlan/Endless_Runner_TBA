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
    }
}