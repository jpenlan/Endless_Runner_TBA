class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Load audio
        this.load.audio('music', './assets/music.mp3');
        this.load.audio('hurt', './assets/hurt.mp3');
        this.load.audio('pickUp', './assets/pickUp.mp3');
        this.load.audio('start', './assets/start.mp3');

        // Load menu images
        this.load.image('menuBackground', './assets/menuBackground.png');
        this.load.image('controls', './assets/controls.png');
        this.load.image('title', './assets/title.png')
        

    }

    create() {
        // Initialize menu
        this.menuBackground = this.add.tileSprite(0, 0, 480, 640, 'menuBackground').setOrigin(0, 0);
        this.title = this.add.tileSprite(-5, -50, 480, 640, 'title').setOrigin(0, 0);
        this.controls = this.add.tileSprite(0, 455, 480, 180, 'controls').setOrigin(0, 0);

         // Define key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // Start play scene
            this.sound.play('start', { volume: 0.5});
            this.scene.start('playScene');
        }
    }
}