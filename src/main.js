let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: [Menu, Play]
    /*physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
}*/
}

let game = new Phaser.Game(config);

//set UI Sizes
let borderUISize = game.config.height / 50;
let borderPadding = borderUISize / 3;

// Reserve keyboard inputs
let keyLEFT, keyRIGHT, keySPACE, keyR;

// Game state
let startGame = false;

// Lane states
let laneOneX, laneTwoX, laneThreeX, laneY, path1;