const rez = 10;
const game = new Game(rez)

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  game.init()
}

function keyPressed() {
  game.onKeyPress(keyCode)
}

function draw() {
 scale(rez);
 background(0,  120, );
  game.draw();
}

function _collide({x, y}, {x:aX, y:aY}) {
  return x == aX && y == aY
}

function _boundTest(pos, bound) {
  return pos > bound - 1 || pos < 0
}



