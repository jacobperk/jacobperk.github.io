/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// Game Variables
var score = 0;
var started = false;
var apple = {};
const snake = {};

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

var updateInterval;
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

$("body").on("keydown", handleKeyDown);
init();

function init() {
  snake.body = []; 
  makeSnakeSquare(10, 10); // Head
  makeSnakeSquare(10, 9);  // Body 1
  makeSnakeSquare(10, 8);  // Body 2
  snake.head = snake.body[0];
  
  makeApple();
  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function update() {
  if (started) {
    moveSnake();
  }

  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}

function moveSnake() {
  // TODO 10: Move body backward so each part follows the one in front
  for (var i = snake.body.length - 1; i > 0; i--) {
    var currentSnakeSquare = snake.body[i];
    var snakeSquareInFront = snake.body[i - 1];
    moveBodyAToBodyB(currentSnakeSquare, snakeSquareInFront);
    repositionSquare(currentSnakeSquare);
  }

  checkForNewDirection();

  // TODO 8: Move the head based on direction
  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  } else if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  } else if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1; // Corrected: row decreases for UP
  } else if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1; // Corrected: row increases for DOWN
  }

  repositionSquare(snake.head);
}

function checkForNewDirection() {
  // TODO 7: Update direction (with basic anti-reversal logic)
  if (activeKey === KEY.LEFT && snake.head.direction !== "right") {
    snake.head.direction = "left";
  } else if (activeKey === KEY.UP && snake.head.direction !== "down") {
    snake.head.direction = "up";
  } else if (activeKey === KEY.RIGHT && snake.head.direction !== "left") {
    snake.head.direction = "right";
  } else if (activeKey === KEY.DOWN && snake.head.direction !== "up") {
    snake.head.direction = "down";
  }
}

function hasHitWall() {
  // TODO 11: Wall collision logic
  if (snake.head.row < 0 || snake.head.row >= ROWS || 
      snake.head.column < 0 || snake.head.column >= COLUMNS) {
    return true;
  }
  return false;
}

function hasCollidedWithApple() {
  // TODO 12: Apple collision logic
  return (snake.head.row === apple.row && snake.head.column === apple.column);
}

function handleAppleCollision() {
  score++;
  scoreElement.text("Score: " + score);

  apple.element.remove();
  makeApple();

  // Grow the snake at the tail's current position
  var row = snake.tail.row;
  var column = snake.tail.column;
  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
  // TODO 13: Self collision logic (skip the head at index 0)
  for (var i = 1; i < snake.body.length; i++) {
    if (snake.head.row === snake.body[i].row && 
        snake.head.column === snake.body[i].column) {
      return true;
    }
  }
  return false;
}

function endGame() {
  clearInterval(updateInterval);
  started = false;
  board.empty();
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;
  setTimeout(init, 500);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function moveBodyAToBodyB(bodyA, bodyB) {
  // TODO 9: Helper to transfer position data
  bodyA.row = bodyB.row;
  bodyA.column = bodyB.column;
  bodyA.direction = bodyB.direction;
}

function makeApple() {
  apple.element = $("<div>").addClass("apple").appendTo(board);
  var randomPosition = getRandomAvailablePosition();
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;
  repositionSquare(apple);
}

function makeSnakeSquare(row, column) {
  const snakeSquare = {};
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);
  snakeSquare.row = row;
  snakeSquare.column = column;
  repositionSquare(snakeSquare);

  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function handleKeyDown(event) {
  activeKey = event.which;
  if ([KEY.LEFT, KEY.RIGHT, KEY.UP, KEY.DOWN].includes(event.which)) {
    started = true;
  }
}

function repositionSquare(square) {
  var squareElement = square.element;
  var buffer = 20;
  squareElement.css("left", square.column * SQUARE_SIZE + buffer);
  squareElement.css("top", square.row * SQUARE_SIZE + buffer);
}

function getRandomAvailablePosition() {
  var spaceIsAvailable = false;
  var randomPosition = {};

  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    // TODO 14: Ensure apple doesn't spawn on snake
    for (var i = 0; i < snake.body.length; i++) {
      if (randomPosition.row === snake.body[i].row && 
          randomPosition.column === snake.body[i].column) {
        spaceIsAvailable = false;
        break;
      }
    }
  }
  return randomPosition;
}

function calculateHighScore() {
  var highScore = sessionStorage.getItem("highScore") || 0;
  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }
  return highScore;
}