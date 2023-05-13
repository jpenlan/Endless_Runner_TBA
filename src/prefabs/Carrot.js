class Carrot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add character to scene, initialize current state
        scene.add.existing(this);
        this.moveSpeed = 60;

        // enable physics on the sprite
        scene.physics.add.existing(this);


    }

    create() {
        
    }

    update() {

    }

}