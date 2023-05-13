class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('field', './assets/fieldBackground.png');
        this.load.image('sky', './assets/tempRunB-Background.png');
        this.load.spritesheet('carrot', './assets/carrot-Sheet.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 3});
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

        this.path1 = new Phaser.Curves.Path(180, 200).quadraticBezierTo(80, 640, 110, 480)
        this.carrot = this.add.follower(this.path1, 0, 0, 'carrot')

        this.carrot.startFollow({
            positionOnPath: true,
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false
        })

        this.carrot = new Carrot(this, -1000, -1000, 'carrot', 0).setOrigin(0, 0);
              

        // GAME OVER flag
        this.gameOver = false; 
        
    }

    update() {
        if (startGame) {
            //this.field.tilePositionY -= 5  
            console.log('game start!');
        }

          // Delay timer for enemy spawn
          let nowTime = this.time.now
          if(nowTime > (this.startTime + 1000)) {
              this.counter += 1; // Increments by a second
              this.startTime = nowTime
          }
  
          // Spawn timer and enemy sprite generator
  
          if(this.counter == Phaser.Math.Between(2, 4)) {
              this.carrot = new Carrot(this, 200, 400, 'carrot', 0).setOrigin(0, 0);
              this.counter = 0;
          }
        
        if (!this.gameOver) {
            this.player.update();
            this.carrot.update();
        }
    }
}