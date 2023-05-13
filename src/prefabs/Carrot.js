class Carrot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add character to scene, initialize current state
        scene.add.existing(this);
        this.moveSpeedX = 0.5;
        this.moveSpeedY = 3;

        // enable physics on the sprite



    }

    create() {
        
    }

    update() {
        console.log('test');
        if(this.x > 240) {
            this.x += this.moveSpeedX;
        }
        if(this.x < 240) {
            this.x -= this.moveSpeedX;
        }
        this.y += this.moveSpeedY;
    }

}