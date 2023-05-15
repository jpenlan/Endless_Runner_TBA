class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('field', './assets/fieldBackground.png');
        this.load.image('sky', './assets/tempRunB-Background.png');
        this.load.image('restart', './assets/restart.png');
        this.load.atlas('carrot', './assets/carrot.png', './assets/carrot.json');
        this.load.atlas('weed', './assets/weed.png', './assets/weed.json');
        this.load.atlas('idle', './assets/charIdle.png', './assets/charIdle.json');
        this.load.atlas('running', './assets/charRun.png', './assets/charRun.json');
        this.load.atlas('grass', './assets/field.png', './assets/field.json');
        this.load.atlas('grassR', './assets/fieldR.png', './assets/fieldR.json');
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
            this.player.anims.play('run');
            this.sound.play('music', { volume: 0.3, repeat: -1});
        }, null, this);

        // Set lanes
        laneOneX = 50;
        laneTwoX = 240;
        laneThreeX = 430;
        laneY = 500;

        // Define key inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Add character 
        this.player = new Player(this, laneTwoX, laneY, 'running', 0);

        // Initialize timer and enemy number
        this.counter = 0;
        this.counter2 = 0;
        this.counter3 = 0;
        this.startTime = this.time.now; // Resets every 1000 milliseconds
        this.startTime2 = this.time.now; // Resets every 1000 milliseconds


        this.carrot = new Carrot(this, -1000, -1000, 'carrot', 0).setOrigin(0, 0);
        this.weed = new Weed(this, -1000, -1000, 'weed', 0).setOrigin(0, 0);

        //Initialize item/obstacle paths for each lane
        path1 = new Phaser.Curves.Path(205, 250).quadraticBezierTo(20, 700, 60, 480)
        path2 = new Phaser.Curves.Path(240, 250).lineTo(240, 700)
        path3 = new Phaser.Curves.Path(275, 250).quadraticBezierTo(460, 700, 410, 480)

        pathF1 = new Phaser.Curves.Path(100, 270).quadraticBezierTo(-200, 700, -80, 400)
        pathF2 = new Phaser.Curves.Path(380, 270).quadraticBezierTo(680, 700, 560, 400)

        //Init animations
        this.anims.create({
            key: 'closingIn',
            frames: this.anims.generateFrameNames('carrot', {
                prefix: 'carrot',
                suffix: '.aseprite',
                start: 0,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 1.5,
            repeat: 0
        })

        this.anims.create({
            key: 'closingInW',
            frames: this.anims.generateFrameNames('weed', {
                prefix: 'weed',
                suffix: '.aseprite',
                start: 0,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 1.5,
            repeat: 0
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('idle', {
                prefix: 'charIdle',
                suffix: '.aseprite',
                start: 0,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('running', {
                prefix: 'charRun',
                suffix: '.aseprite',
                start: 0,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 15,
            repeat: -1
        })
              
        this.anims.create({
            key: 'fieldGrass',
            frames: this.anims.generateFrameNames('grass', {
                prefix: 'field',
                suffix: '.aseprite',
                start: 0,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: 0
        })

        this.anims.create({
            key: 'fieldGrassR',
            frames: this.anims.generateFrameNames('grassR', {
                prefix: 'fieldR',
                suffix: '.aseprite',
                start: 0,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: 0
        })

        // Points var
        this.p1Score = 0;
        
        // Player health
        this.p1Health = 3;

        // Display Score
        let scoreConfig = {
            fontFamily: 'Roboto',
            strokeThickness: 3,
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            alpha: '0.5',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
            }
            this.scoreLeft = this.add.text(360, 20, 'Score: ' + this.p1Score, scoreConfig);

            // Display Score
        let healthConfig = {
            fontFamily: 'Roboto',
            strokeThickness: 3,
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            alpha: '0.5',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
            }
            this.healthLeft = this.add.text(20, 20, 'Health:' + this.p1Health, healthConfig);

            this.player.anims.play('idle');

        // GAME OVER flag
        this.gameOver = false; 

        this.mode1 = true;
        this.mode2 = false;
        
    }

    update() {

        // Display credits
        let creditsConfig = {
            fontFamily: 'Roboto',
            strokeThickness: 1,
            fontSize: '20px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            alpha: '0.5',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400 
            }

          if (startGame) {
            //this.field.tilePositionY -= 5  
            console.log('game start!');
            this.clock = this.time.delayedCall(27500, () => {
                //Increase difficulty
                this.mode1 = false;
                this.mode2 = true;
            }, null, this);

            if (this.mode1) {
                                  // Delay timer for enemy spawn
            let nowTime = this.time.now
            if(nowTime > (this.startTime + 1000)) {
              this.counter += 1; // Increments by a second
              this.counter2 += 1;
              this.startTime = nowTime
          }

          if(nowTime > (this.startTime2 + 500)) {
            this.counter3 += 1;
            this.startTime2 = nowTime
        }

            if (this.counter3 == 1) {
                this.counter3 = 0;
                field1 = this.add.follower(pathF1, 0, 0, 'grass')
                field1.startFollow({
                        positionOnPath: true,
                        duration: 5000,
                        yoyo: false,
                        repeat: 0,
                        rotateToPath: false
                    })
                field1.anims.play('fieldGrass');

                field2 = this.add.follower(pathF2, 0, 0, 'grassR')
                field2.startFollow({
                        positionOnPath: true,
                        duration: 5000,
                        yoyo: false,
                        repeat: 0,
                        rotateToPath: false
                    })
                field2.anims.play('fieldGrassR');
            }
  
          // Spawn timer and enemy sprite generator
          this.laneNum = Phaser.Math.Between(0,2);
          this.laneNum2 = Phaser.Math.Between(0,2);
  
            if(this.counter == Phaser.Math.Between(3, 6)) {
                /*this.carrot = new Carrot(this, 200, 400, 'carrot', 0).setOrigin(0, 0);*/
                this.counter = 0;

            if (this.laneNum == 0) {
                carrot1 = this.add.follower(path1, 0, 0, 'carrot')
                carrot1.startFollow({
                    positionOnPath: true,
                    duration: 6000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false
                })
                this.clock = this.time.delayedCall(3000, () => {
                    // Collision detection for lane 1
                    if(carrot1.y > 375 && carrot1.y < 525 && this.player.x == laneOneX) {
                        carrot1.destroy();
                        this.p1Score += 1;
                        this.sound.play('pickUp', { volume: 0.5});
                        this.scoreLeft.text = 'Score: ' + this.p1Score;
                    }
                }, null, this);
                carrot1.anims.play('closingIn');
            }

            if (this.laneNum == 1) {
                carrot2 = this.add.follower(path2, 0, 0, 'carrot')
                carrot2.startFollow({
                    positionOnPath: true,
                    duration: 6000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false
                })
                this.clock = this.time.delayedCall(3000, () => {
                    // Collision detection for lane 2
                    if(carrot2.y > 350 && carrot2.y < 500 && this.player.x == laneTwoX) {
                        carrot2.destroy();
                        this.p1Score += 1;
                        this.sound.play('pickUp', { volume: 0.5});
                        this.scoreLeft.text = 'Score: ' + this.p1Score;
                    }
                }, null, this);
                carrot2.anims.play('closingIn');
            }

            if (this.laneNum == 2) {
                carrot3 = this.add.follower(path3, 0, 0, 'carrot')
                carrot3.startFollow({
                    positionOnPath: true,
                    duration: 6000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false
                })
                this.clock = this.time.delayedCall(3000, () => {
                    // Collision detection for lane 3
                    if(carrot3.y > 375 && carrot3.y < 525 && this.player.x == laneThreeX) {
                        carrot3.destroy();
                        this.p1Score += 1;
                        this.sound.play('pickUp', { volume: 0.5});
                        this.scoreLeft.text = 'Score: ' + this.p1Score;
                    }
                }, null, this);
                carrot3.anims.play('closingIn');
            }
            }


            // Spawner for weeds
            if(this.counter2 == Phaser.Math.Between(4, 5)) {
                /*this.carrot = new Carrot(this, 200, 400, 'carrot', 0).setOrigin(0, 0);*/
                this.counter2 = 0;

            if (this.laneNum2 == 0) {
                weed1 = this.add.follower(path1, 0, 0, 'weed')
                weed1.startFollow({
                    positionOnPath: true,
                    duration: 6000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false
                })
                this.clock = this.time.delayedCall(3000, () => {
                    // Collision detection for lane 1
                    if(weed1.y > 375 && weed1.y < 525 && this.player.x == laneOneX) {
                        weed1.destroy();
                        this.p1Health -= 1;
                        this.sound.play('hurt', { volume: 0.5});
                        this.healthLeft.text = 'Health:' + this.p1Health;
                    }
                }, null, this);
                weed1.anims.play('closingInW');
            }

            if (this.laneNum2 == 1) {
                weed2 = this.add.follower(path2, 0, 0, 'weed')
                weed2.startFollow({
                    positionOnPath: true,
                    duration: 6000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false
                })
                this.clock = this.time.delayedCall(3000, () => {
                    // Collision detection for lane 2
                    if(weed2.y > 350 && weed2.y < 500 && this.player.x == laneTwoX) {
                        weed2.destroy();
                        this.p1Health -= 1;
                        this.sound.play('hurt', { volume: 0.5});
                        this.healthLeft.text = 'Health:' + this.p1Health;
                    }
                }, null, this);
                weed2.anims.play('closingInW');
            }

            if (this.laneNum2 == 2) {
                weed3 = this.add.follower(path3, 0, 0, 'weed')
                weed3.startFollow({
                    positionOnPath: true,
                    duration: 6000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false
                })
                this.clock = this.time.delayedCall(3000, () => {
                    // Collision detection for lane 3
                    if(weed3.y > 375 && weed3.y < 525 && this.player.x == laneThreeX) {
                        weed3.destroy();
                        this.p1Health -= 1;
                        this.sound.play('hurt', { volume: 0.5});
                        this.healthLeft.text = 'Health:' + this.p1Health;
                    }
                }, null, this);
                weed3.anims.play('closingInW');
            }
            }

        }
        if (this.mode2) {
                                  // Delay timer for enemy spawn
                                  let nowTime = this.time.now
                                  if(nowTime > (this.startTime + 400)) {
                                    this.counter += 1; // Increments by a second
                                    this.counter2 += 1;
                                    this.startTime = nowTime
                                }
                      
                                if(nowTime > (this.startTime2 + 200)) {
                                  this.counter3 += 1;
                                  this.startTime2 = nowTime
                              }
                      
                                  if (this.counter3 == 1) {
                                      this.counter3 = 0;
                                      field1 = this.add.follower(pathF1, 0, 0, 'grass')
                                      field1.startFollow({
                                              positionOnPath: true,
                                              duration: 2000,
                                              yoyo: false,
                                              repeat: 0,
                                              rotateToPath: false
                                          })
                                      field1.anims.play('fieldGrass');
                      
                                      field2 = this.add.follower(pathF2, 0, 0, 'grassR')
                                      field2.startFollow({
                                              positionOnPath: true,
                                              duration: 2000,
                                              yoyo: false,
                                              repeat: 0,
                                              rotateToPath: false
                                          })
                                      field2.anims.play('fieldGrassR');
                                  }
                        
                                // Spawn timer and enemy sprite generator
                                this.laneNum = Phaser.Math.Between(0,2);
                                this.laneNum2 = Phaser.Math.Between(0,2);
                        
                                  if(this.counter == Phaser.Math.Between(3, 6)) {
                                      /*this.carrot = new Carrot(this, 200, 400, 'carrot', 0).setOrigin(0, 0);*/
                                      this.counter = 0;
                      
                                  if (this.laneNum == 0) {
                                      carrot1 = this.add.follower(path1, 0, 0, 'carrot')
                                      carrot1.startFollow({
                                          positionOnPath: true,
                                          duration: 3000,
                                          yoyo: false,
                                          repeat: 0,
                                          rotateToPath: false
                                      })
                                      this.clock = this.time.delayedCall(1300, () => {
                                          // Collision detection for lane 1
                                          if(carrot1.y > 375 && carrot1.y < 525 && this.player.x == laneOneX) {
                                              carrot1.destroy();
                                              this.p1Score += 1;
                                              this.sound.play('pickUp', { volume: 0.5});
                                              this.scoreLeft.text = 'Score: ' + this.p1Score;
                                          }
                                      }, null, this);
                                      carrot1.anims.play('closingIn');
                                  }
                      
                                  if (this.laneNum == 1) {
                                      carrot2 = this.add.follower(path2, 0, 0, 'carrot')
                                      carrot2.startFollow({
                                          positionOnPath: true,
                                          duration: 3000,
                                          yoyo: false,
                                          repeat: 0,
                                          rotateToPath: false
                                      })
                                      this.clock = this.time.delayedCall(1300, () => {
                                          // Collision detection for lane 2
                                          if(carrot2.y > 350 && carrot2.y < 500 && this.player.x == laneTwoX) {
                                              carrot2.destroy();
                                              this.p1Score += 1;
                                              this.sound.play('pickUp', { volume: 0.5});
                                              this.scoreLeft.text = 'Score: ' + this.p1Score;
                                          }
                                      }, null, this);
                                      carrot2.anims.play('closingIn');
                                  }
                      
                                  if (this.laneNum == 2) {
                                      carrot3 = this.add.follower(path3, 0, 0, 'carrot')
                                      carrot3.startFollow({
                                          positionOnPath: true,
                                          duration: 3000,
                                          yoyo: false,
                                          repeat: 0,
                                          rotateToPath: false
                                      })
                                      this.clock = this.time.delayedCall(1300, () => {
                                          // Collision detection for lane 3
                                          if(carrot3.y > 375 && carrot3.y < 525 && this.player.x == laneThreeX) {
                                              carrot3.destroy();
                                              this.p1Score += 1;
                                              this.sound.play('pickUp', { volume: 0.5});
                                              this.scoreLeft.text = 'Score: ' + this.p1Score;
                                          }
                                      }, null, this);
                                      carrot3.anims.play('closingIn');
                                  }
                                  }
                      
                      
                                  // Spawner for weeds
                                  if(this.counter2 == Phaser.Math.Between(4, 5)) {
                                      /*this.carrot = new Carrot(this, 200, 400, 'carrot', 0).setOrigin(0, 0);*/
                                      this.counter2 = 0;
                      
                                  if (this.laneNum2 == 0) {
                                      weed1 = this.add.follower(path1, 0, 0, 'weed')
                                      weed1.startFollow({
                                          positionOnPath: true,
                                          duration: 3000,
                                          yoyo: false,
                                          repeat: 0,
                                          rotateToPath: false
                                      })
                                      this.clock = this.time.delayedCall(1300, () => {
                                          // Collision detection for lane 1
                                          if(weed1.y > 375 && weed1.y < 525 && this.player.x == laneOneX) {
                                              weed1.destroy();
                                              this.p1Health -= 1;
                                              this.sound.play('hurt', { volume: 0.5});
                                              this.healthLeft.text = 'Health:' + this.p1Health;
                                          }
                                      }, null, this);
                                      weed1.anims.play('closingInW');
                                  }
                      
                                  if (this.laneNum2 == 1) {
                                      weed2 = this.add.follower(path2, 0, 0, 'weed')
                                      weed2.startFollow({
                                          positionOnPath: true,
                                          duration: 3000,
                                          yoyo: false,
                                          repeat: 0,
                                          rotateToPath: false
                                      })
                                      this.clock = this.time.delayedCall(1300, () => {
                                          // Collision detection for lane 2
                                          if(weed2.y > 350 && weed2.y < 500 && this.player.x == laneTwoX) {
                                              weed2.destroy();
                                              this.p1Health -= 1;
                                              this.sound.play('hurt', { volume: 0.5});
                                              this.healthLeft.text = 'Health:' + this.p1Health;
                                          }
                                      }, null, this);
                                      weed2.anims.play('closingInW');
                                  }
                      
                                  if (this.laneNum2 == 2) {
                                      weed3 = this.add.follower(path3, 0, 0, 'weed')
                                      weed3.startFollow({
                                          positionOnPath: true,
                                          duration: 3000,
                                          yoyo: false,
                                          repeat: 0,
                                          rotateToPath: false
                                      })
                                      this.clock = this.time.delayedCall(1300, () => {
                                          // Collision detection for lane 3
                                          if(weed3.y > 375 && weed3.y < 525 && this.player.x == laneThreeX) {
                                              weed3.destroy();
                                              this.p1Health -= 1;
                                              this.sound.play('hurt', { volume: 0.5});
                                              this.healthLeft.text = 'Health:' + this.p1Health;
                                          }
                                      }, null, this);
                                      weed3.anims.play('closingInW');
                                  }
                                  }
                                }
                            }
        if (this.p1Health == 0) {
            this.gameOver = true;
        }

        if (this.gameOver) {
            this.startGame = false;
            this.credits = this.add.text(30, 500, "Art, Programming, Sounds: Jacob Penland \nMusic: David Renda", creditsConfig);
            this.player.anims.play('idle');
            this.field = this.add.tileSprite(0, 250, 480, 150, 'restart').setOrigin(0, 0);
            game.sound.stopAll();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.scene.start('menuScene');
        }

        if (!this.gameOver) {
            this.player.update();
            this.carrot.update();
        }
}
}