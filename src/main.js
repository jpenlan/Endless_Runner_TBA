/*
Jacob Penland
Garden Defender
Hours: ~40 Hours
Regarding programming, I feel the use of paths and time based movement on animated sprites to create the illusion of a 3D environment was particularly unique. I certainly could have made it more elegant (particularly the update() function in Play.js), but it did take a lot of work to make, and for that I'm proud of it.
Regrarding art, I took a good amount of time to make every asset, animations included, and created an atlas for multiple sprite sheets. Additionally the art was meant to work in tandem with the code to create the illusion of a 3D envrionment, and for the most part I think I did that well.
/*

let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
}
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
let laneOneX, laneTwoX, laneThreeX, laneY, path1, path2, path3, pathF1, pathF2;

let carrot1, carrot2, carrot3

let weed1, weed2, weed3

let field1, field2