# SnakeNeon.io
class Food {
  constructor(boundaries) {
    this.boundaries = boundaries
    this.location = this._generateFood()
  }
  
  eaten() {
    this.location = this._generateFood()
  }
  
  draw() {
      noStroke();
    fill(377, 23, 44);
    rect(this.location.x, this.location.y, 1, 1);
  }
  
  _generateFood() {
    let x = floor(random(this.boundaries.x));
    let y = floor(random(this.boundaries.y));
    return createVector(x, y);
  }
}
