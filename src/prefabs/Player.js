class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add character to scene, initialize current state
        scene.add.existing(this);
        this.isRunning = false;
        this.isStarting = true;
        this.swapSpeed = 30


    }

    update() {
        // Move left and right
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log('test');
            console.log(this.x);
            console.log(laneTwoX);
            if(this.x == laneTwoX) {
                this.x = laneOneX; // Temporary
            }
            if(this.x == laneThreeX) {
                this.x = laneTwoX; // Temporary
            }
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            if(this.x == laneTwoX) {
                console.log('test');
                this.x = laneThreeX; // Temporary
            }
            if(this.x == laneOneX) {
                this.x = laneTwoX; // Temporary
            }
        }

         if(this.startGame) {
            this.isRunning = true;
            this.isStarting = false;
         }
    }
}