class Game {
  constructor(rez) {
    this.rez = rez
    this.boundries = {
      x: 0,
      y: 0
    }
    this.food = null
    this.snake = null
    this.maxScore = 0
    this.gameEnd = false
  }

  onKeyPress(keyCode) {
    this._triggerKeyPress({
      "SPACE": () => {
        return this.gameEnd ? this.init(true) : this.snake.grow()
      },
      "LEFT_ARROW": () => this.snake.updateDirection(-1, 0),
      "RIGHT_ARROW": () => this.snake.updateDirection(1, 0),
      "DOWN_ARROW": () => this.snake.updateDirection(0, 1),
      "UP_ARROW": () => this.snake.updateDirection(0, -1),
    }, keyCode)
  }


  _keyCodeKey(keyCode) {
    return [
      ["SPACE", 32],
      ["LEFT_ARROW", LEFT_ARROW],
      ["RIGHT_ARROW", RIGHT_ARROW],
      ["DOWN_ARROW", DOWN_ARROW],
      ["UP_ARROW", UP_ARROW],
    ].reduce((comm, [k, v]) => v === keyCode ? k : comm, "default")
  }

  _triggerKeyPress(fns, keyCode) {
    ({
      ...fns,
      "default": () => ""
    })[this._keyCodeKey(keyCode)]()
  }

  init(restart) {
    this.gameEnd = false
    this.boundaries = {
      x: floor(width / this.rez),
      y: floor(height / this.rez)
    }
    this.snake = new Snake(this.boundaries);
    this.food = new Food(this.boundaries);
  }

  endGame() {
    this.maxScore = Math.max(this.maxScore, this.snake.size())
    background(0, 0, 120);
    textSize(8);
    text("Game", (this.boundaries.x / 3) - 5, (this.boundaries.y / 2) - 3)
    text("Over", (this.boundaries.x / 2) - 5, (this.boundaries.y) - 33)
    textSize(2);
    text(`Apples eaten: ${this.snake.size()}   Score: ${this.maxScore}`, (this.boundaries.x / 5) - 5, this.boundaries.y - 1)
    this.gameEnd = true
  }


  draw() {
    if (this.gameEnd || this.snake.dead()) return this.endGame()

    if (this.snake.willEat(this.food)) this.food.eaten();

    this.snake.update();
    this.food.draw();
    this.snake.draw();

  }
}
