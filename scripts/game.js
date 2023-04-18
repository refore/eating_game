
// import "phaser" 
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        // parent:"",
        physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: false
        },
        
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload ()
{
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', 
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
var player
var platforms;
var cursors
var stars;
var bombs
function create ()
{
    this.add.image(400, 300, 'sky');

    // platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');
//创造玩家
    player = this.physics.add.sprite(300, 250, 'star');
    player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(0)
//创造星星
stars = this.physics.add.group({
    key:"star",
    repeat:11,
    setXY:{x:12,y:100,stepX:70}
})
stars.children.iterate(function (child) {
child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
});

//炸弹
bombs = this.physics.add.group();



//定义一些动作
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            // frames: [ { key: 'star' } ],

            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
//定义碰撞关系
// this.physics.add.collider(player, platforms);
// this.physics.add.collider(stars, platforms);
// this.physics.add.collider(bombs, platforms);
// this.physics.add.collider(stars, player);
this.physics.add.collider(stars, stars);
this.physics.add.overlap(player, stars, collectStar, null, this);
// this.physics.add.collider(player, bombs, hitBomb, null, this);
//定义按键监听
cursors= this.input.keyboard.createCursorKeys();


}

//用来放置动态相关的内容
    function update ()
    {
        if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    // player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    // player.anims.play('right', true);
}else{
    player.setVelocityX(0);
}

if (cursors.up.isDown)
{
    player.setVelocityY(-160);

    // player.anims.play('right', true);
}
else if (cursors.down.isDown)
{
    player.setVelocityY(160);

    // player.anims.play('right', true);
}else{
    player.setVelocityY(0);
}

// else
//     {
//         player.setVelocity(0,0);

//         player.anims.play('turn');
//     }

    }

    function collectStar(player,stars){
        stars.disableBody(true,true)
        // stars.setScale(1.1,1.2)
        // stars.displayHeight=0.5
        // stars.displayWidth=0.5
        player.scale=player.scale*1.2

        //
    //     if (stars.countActive(true) === 0)
    // {
    //     stars.children.iterate(function (child) {

    //         child.enableBody(true, child.x, 0, true, true);

    //     });
    // }

    // var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    //     var bomb = bombs.create(x, 16, 'bomb');
    //     bomb.setBounce(1);
    //     bomb.setCollideWorldBounds(true);
    //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}

    function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
    
}
