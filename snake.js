class Snake {
  constructor({x, y}) {
      this.dirVec = {x:0, y:0};
  this.boundBy = {x, y}
      this.snake = [{x: floor(x/2), y: floor(y/2)}];
  }
  
  size() {
    return this.snake.length
  }
  
  canEat([head], apple) {
    return _collide(head, apple.location)
  }
  
  willEat(apple) {
    return this.canEat(this.snake,apple) ? this.grow() : false;
  }
  
  grow() {
    this.snake = this._growSnake(this.snake);
    return true;
  }
  
  updateDirection(x, y) {
    this.dirVec = {x, y}
  }
  
  update() {
        this.snake = this._updateSnake(this.snake, this.dirVec)
  }
  
  dead() {
    return this._outsideBoundary(this.snake, this.boundBy.x, this.boundBy) ||
           this._snakeCollision(this.snake, this.dirVec)
  }
  
  draw() {
    const _drawBodySection = ({x, y}) => {
      fill(212, 0, 345);
      noStroke();
      rect(x, y, 1, 1);
    }
    
        this.snake.map(_drawBodySection)
  }
  
  // Private Functional Functions
    _updateSnake(snake, dirVec) {
      const newBody = snake.slice(0, -1);
      const newHead = this._updateHead(snake[0], dirVec);
      return [newHead, ...newBody];
    }
  _snakeCollision([head, ...body],dirVec) {
    return body.some((seg) => _collide(seg, this._updateHead(head, dirVec)))
  }
  
  _outsideBoundary([{x, y}], h, w) {
    return _boundTest(x, w) || _boundTest(y, h)
  }
  
  _updateHead({x, y}, {x: dirX, y: dirY}) {
    return {x: x+dirX, y: y+dirY}
  }
  _growSnake(snake) {
    return [...snake, snake.slice(-1)]
  }
}
