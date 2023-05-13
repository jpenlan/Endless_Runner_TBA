class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('field', './assets/fieldBackground.png');
        this.load.image('sky', './assets/tempRunB-Background.png');
        this.load.atlas('carrot', './assets/carrot.png', './assets/carrot.json');
        this.load.spritesheet('running', './assets/charRun.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 9});
    }

    create() {
        // Add field and sky
        this.sky = this.add.tileSprite(0, 0, 480, 640, 'sky').setOrigin(0, 0);
        this.field = this.add.tileSprite(0, 0, 480, 640, 'field').setOrigin(0, 0);

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

        // Initialize timer and enemy number
        this.counter = 0;
        this.startTime = this.time.now; // Resets every 1000 milliseconds

        // Generate carrot frames
        this.anims.create({
            key: 'closingIn',
            frames: this.anims.generateFrameNames('carrot', {
                prefix: 'carrot',
                suffix: '.aseprite',
                start: 0,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 2.3,
            repeat: 0
        });
        this.carrot1 = new Carrot(this, -100, -100, 'carrot', 0).setOrigin(0, 0);
        this.carrot2 = new Carrot(this, -100, -100, 'carrot', 0).setOrigin(0, 0);
        this.carrot3 = new Carrot(this, -100, -100, 'carrot', 0).setOrigin(0, 0);
              

        // GAME OVER flag
        this.gameOver = false; 
        
    }

    update() {
        if (startGame) {
            //this.field.tilePositionY -= 5  
            console.log('game start!');

            // Delay timer for enemy spawn
            let nowTime = this.time.now
            if(nowTime > (this.startTime + 1000)) {
                this.counter += 1; // Increments by a second
                this.startTime = nowTime
            }

            // Random lane
            this.laneNum = Phaser.Math.Between(0, 2)
  
            // Spawn timer and enemy sprite generator
            if(this.counter == Phaser.Math.Between(2, 4)) {
                if (this.laneNum == 0) {
                    this.carrot1 = new Carrot(this, laneOneX, 180, 'carrot', 0).setOrigin(0, 0);
                    this.carrot1.anims.play('closingIn');
                }
                if (this.laneNum == 1) {
                    this.carrot2 = new Carrot(this, 240, 180, 'carrot', 0).setOrigin(0, 0);
                    this.carrot2.anims.play('closingIn');
                }
                if (this.laneNum == 2) {
                    this.carrot3 = new Carrot(this, laneThreeX-115, 180, 'carrot', 0).setOrigin(0, 0);
                    this.carrot3.anims.play('closingIn');
                }
                
                this.counter = 0;
            }
            


            if (!this.gameOver) {
                this.player.update();
                this.carrot1.update();
                this.carrot2.update();
                this.carrot3.update();
                
            }
        
        }

        
    }
}