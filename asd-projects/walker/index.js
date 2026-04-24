$(document).ready(runProgram);
function runProgram(){
////////////////////////////////////////////////////////////////////////////////
//////////////////////////// SETUP /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Constant Variables
var FRAME_RATE = 60;
var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
// TODO 3: KEY Object
const KEY = {
LEFT: 37,
UP: 38,
RIGHT: 39,
DOWN: 40,
};

// TODO 4: walker Object
var walker = {
x: 0,
y: 0,
speedX: 0,
speedY: 0
};

// one-time setup
var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

// TODO 2 & 8: Register Event Listeners
$(document).on('keydown', handleKeyDown);
$(document).on('keyup', handleKeyUp);

////////////////////////////////////////////////////////////////////////////////
///////////////////////// CORE LOGIC ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function newFrame() {
repositionGameItem(); // TODO 5
wallCollision(); // TODO 9
redrawGameItem(); // TODO 6
}
// TODO 7: Set speed when key is pressed
function handleKeyDown(event) {
if (event.which === KEY.LEFT) {
walker.speedX = -5;
} else if (event.which === KEY.UP) {
walker.speedY = -5;
} else if (event.which === KEY.RIGHT) {
walker.speedX = 5;
} else if (event.which === KEY.DOWN) {
walker.speedY = 5;
}
}

// TODO 8: Stop speed when key is released
function handleKeyUp(event) {
if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
walker.speedX = 0;
} else if (event.which === KEY.UP || event.which === KEY.DOWN) {
walker.speedY = 0;
}
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO 5: Calculate new coordinates
function repositionGameItem() {
walker.x += walker.speedX;
walker.y += walker.speedY;
}
// TODO 6: Update CSS position on screen
function redrawGameItem() {
$("#walker").css("left", walker.x);
$("#walker").css("top", walker.y);
}

// TODO 9: Stay within the #board boundaries
function wallCollision() {
// Left boundary
if (walker.x < 0) {
walker.x -= walker.speedX;
}
// Right boundary (Board Width - Walker Width)
if (walker.x > $("#board").width() - 50) {
walker.x -= walker.speedX;
}
// Top boundary
if (walker.y < 0) {
walker.y -= walker.speedY;
}
// Bottom boundary (Board Height - Walker Height)
if (walker.y > $("#board").height() - 50) {
walker.y -= walker.speedY;
}
}

function endGame() {
clearInterval(interval);
$(document).off();
}
}
