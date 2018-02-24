var AM = new AssetManager();
var n = 25;
var width = 900;
var height = 800;

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// inheritance 
function Cheetah(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
    this.speed = 350;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

Cheetah.prototype = new Entity();
Cheetah.prototype.constructor = Cheetah;

Cheetah.prototype.update = function () {
    this.x = -500;
    Entity.prototype.update.call(this);
}

Cheetah.prototype.draw = function () {
    //this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
	drawRectangles(this.ctx);
    Entity.prototype.draw.call(this);
}
function drawRectangles(ctx) {
	//for each input n, draw a rectangle which scales with n
	for (var i = 1; i <= n; i++) {
		ctx.beginPath();
		ctx.rect(i * (width/n) - (width/n), (height/n) + height-((height/n) * i) - (height*.025),(width/n), (height/n) + ((height/n) * i));
		ctx.fillText(i, (width/n) * i - (width/n/2), (height/n) + height-((height/n) * i) - (height*.025));
		ctx.stroke();
		/*ctx.beginPath();
		ctx.rect(188, 50, 200, 100);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.lineWidth = 7;
		ctx.strokeStyle = 'black';
		ctx.stroke();*/
		
	}
}
AM.queueDownload("./img/runningcat.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    console.log("All Done!");
});