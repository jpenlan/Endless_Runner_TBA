let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set UI Sizes
let borderUSSize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Reserve keyboard inputs
let keyLEFT, keyRIGHT, keySPACE, keyR;