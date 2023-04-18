//预加载,包含preload与启动create
// import PlayGame from "./playGame"

export class PreloadAssets extends Phaser.Scene {
 
    // constructor    
    constructor() {
        super({
            key : 'PreloadAssets'
        });
    }
 
    // method to be execute during class preloading
    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('star', './assets/star.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.spritesheet('dude', 
            './assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
 
    // method to be called once the instance has been created
    create() {
 
        // call PlayGame class
        this.scene.start('PlayGame');
    }
}