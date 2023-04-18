//主文件，用于集成
import { PlayGame } from './playGame';
import { PreloadAssets } from './preloadAssets';
// object to initialize the Scale Manager
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
    default: 'arcade',
    arcade: {
        gravity: false,
        debug: false
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
},
scene : [PreloadAssets, PlayGame]
};
