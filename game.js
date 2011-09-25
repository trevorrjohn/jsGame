//width and height of canvas
var width = 320;
var height = 500;
var c = document.getElementById('c');
var ctx = c.getContect('2d');
var gLoop;
//sets canvas size
 c.width = width;
 c.height = height;

 var clear = function() {
   //set color to blbue
   ctx.fillStyle = '#d0e7f9';
   ctx.beginPath();
   ctx.rect(0, 0, width, height c);
   ctx.closePath();
   ctx.fill();
 }

var howManyCircles = 10;
var circles[];
//creates circles array with circles[width, height, size,, transparency]
for(var i = 0; i < howManyCircles; i++) {
  circles.push([Math.random() * width, Math.random() * height, 
    Math.random() * 100, Math.random() /2]);
}

var DrawCircles = function() {
  for(var i =0; i < howManyCircles; i++) {
    ctx.fillStyle = 'rgba(255,255,255, ' + circles[i][3] + ')';
    ctx.beginPath()
    ctx.arc(circles[1][0], circles[i][1], circles[i][2], 
        0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};
  
var MoveCircles = function(deltaY) {
  for(var i =0;  i < howManyCircles; i++) {
    if(circles[i][1] - circles[i][2]  > height) {
      circles[i][0] = Math.random()*width;
      circles[i][2] = Math.random()* 100;
      circles[i][1] = 0- circles[i][2];
      circles[i][3] = Math.random()/2;
    } else {
      circles[i][1]+=deltaY;
    }
  }
};

var GameLoop = function(){
  clear();
  MoveCircles(5);
  DrawCircles();
  if(player.isJumping) player.checkJump();
  if(player.isFalling) player.checkFall();
  player.draw();
  gLoop = setTimeout(GameLoop, 1000/50);
}
GameLoop();

var player = new (function(){
  var that = this; //that will be the ctx now
  that.image = new Image();
  that.image.src = "angel.png";
  that.width = 65;
  that.height = 95;
  that.x = 0; //x and y pos
  that.y = 0;
  that.frames =1;
  that.actualFrame = 0;
  that.isJumping = false;
  that.isFalling = false;

  that.jumpSpeed = 0;
  that.fallSpeed = 0;

  that.moveLeft = function() {
    if(that.x > 0) {
      that.setPosition(that.x - 5, that.y);
    }
  }
  that.moveRight =function() {


  that.jump = function() {
    if(!that.isJumping && !that.isFalling) {
      that.fallSpeed = 0;
      that.isJumping = true;
      that.jumpSpeed = 17;
    }
  }
  
  that.checkJump = function() {
    that.setPosition(that.x, that.y - that.jumpSpeed);
    that.jumpSpeed--;
    if(that.jumpSpeed == 0) {
      that.isJumping = false;
      that.isFalling = true;
      that.fallSpeed = 1;
    }
  }

  that.checkFall = function() {
    if(that.y < height - that.height) {
      that.setPosition(that.x, that.y + that.fallSpeed);
      that.fallSpeed++;
    } else {
      that.fallStop();
    }
  }

  that.fallStop = function() {
    that.isFalling= false;
    that.fallSpeed = 0;
    that.jump();
  }

  that.setPosition = function(x, y) {
    that.x = x;
    that.y = y;
  }
  
  player.jump();

  that.draw = function(){
    try{
      ctx.drawImage(that.image, 0, that.height * that.actualFrame,
        that.width, that.height, that.x, that.y, that.width, that.height);
    } catch (e) {    };
    if (that.interval == 4) {
      if(that.actualFrame == that.frames) {
        that.acutalFrame = 0;
      } else {
        that.actualFrame++;
      }
      that.interval = 0;
    }
    that.interval++;
  }
})();

player.setPosition(~~((width-player.width)/2), ~~((height-player.height)/2));

