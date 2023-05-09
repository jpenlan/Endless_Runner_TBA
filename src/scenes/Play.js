class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('field', './assets/tempRunBackground.png');
        this.load.image('sky', './assets/tempRunB-Background.png');
        this.load.spritesheet('running', './assets/charRun.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 9});
    }

    create() {
        // Add field and sky
        this.sky = this.add.tileSprite(0, 0, 480, 640, 'sky').setOrigin(0, 0);
        this.field = this.add.tileSprite(0, 240, 480, 400, 'field').setOrigin(0, 0);

        /* White border
        this.add.rectangle(0, 0, game.config.width, borderUISize,0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0); */

        // Delay start after beginning game
        this.clock = this.time.delayedCall(3000, () => {
            startGame = true;
        }, null, this);

        // Set lanes
        laneOneX = 80;
        laneTwoX = 240;
        laneThreeX = 400;
        laneY = 500;

        // Define key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Add character 
        this.player = new Player(this, laneTwoX, laneY, 'running', 0);

        // GAME OVER flag
        this.gameOver = false; 
        
    }

    update() {
        if (startGame) {
            this.field.tilePositionY -= 5  
        }
        
        if (!this.gameOver) {
            this.player.update();
        }
    }
}