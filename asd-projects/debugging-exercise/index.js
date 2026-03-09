$(document).ready(function () {

/////////////////
// initialization
/////////////////

var doubleMaxSpeed = 5;
var maxGhosts = 10;
var $board = $("#board");
var boardWidth = $board.width();
var boardHeight = $board.height();
var ghosts = [];
var ghostRadius = 10;

const FPS = 25;
const initialDelay = 5000;

//////////
// startup
//////////

for (var i = 0; i < maxGhosts; i++) {
  var newId = getId(i);
  var newGhost = makeGhost(newId);
  ghosts.push(newGhost);

  addNewGhostElement(newGhost, newId);
}

startProgram();

///////////////////////////
// startup helper functions
///////////////////////////

function makeGhost(id) {
  var ghost = {};

  var maxX = boardWidth - ghostRadius * 2;
  var maxY = boardHeight - ghostRadius * 2;

  ghost.id = "#" + id;
  ghost.x = Math.random() * maxX;
  ghost.y = Math.random() * maxY;
  ghost.speedX = decideSpeed();
  ghost.speedY = decideSpeed();

  const colors = [
    "#00f", "#f00", "#0f0", "#ff0", "#0ff",
    "#f0f", "#fff", "#fa0", "#0a0", "#a0f",
  ];

  ghost.color = colors[Math.floor(Math.random() * colors.length)];

  return ghost;
}

function decideSpeed() {
  return Math.random() * doubleMaxSpeed - doubleMaxSpeed / 2;
}

function getId(number) {
  return "ghost" + number;
}

function addNewGhostElement(ghost, id) {
  var $ghost = $("<img>")
    .attr("id", id)
    .attr("src", "img/ghost.png")
    .css({
      position: "absolute",
      left: ghost.x,
      top: ghost.y
    })
    .addClass("ghost");

  $ghost.appendTo($board);
}

//////////////////
// update function
//////////////////

function update() {
  for (var i = 0; i < maxGhosts; i++) {
    var ghost = ghosts[i];

    moveGhost(ghost);
    bounceGhost(ghost);
    updateGhostOnScreen(ghost);
    updateOrientation(ghost);
  }
}

//////////////////////////
// update helper functions
//////////////////////////

function moveGhost(ghost) {
  ghost.x += ghost.speedX;
  ghost.y += ghost.speedY;
}

function bounceGhost(ghost) {

  if (ghost.x <= 0 || ghost.x >= boardWidth - ghostRadius * 2) {
    ghost.speedX *= -1;
  }

  if (ghost.y <= 0 || ghost.y >= boardHeight - ghostRadius * 2) {
    ghost.speedY *= -1;
  }
}

function updateGhostOnScreen(ghost) {
  $(ghost.id).css({
    left: ghost.x,
    top: ghost.y,
    transition: "left 0.2s linear, top 0.2s linear, filter 0.2s",
    filter: `drop-shadow(0 0 4px #fff)
             drop-shadow(0 0 8px ${ghost.color})
             drop-shadow(0 0 12px ${ghost.color})`
  });
}

////////////////////////////////////////////
// DO NOT CHANGE ANY CODE BELOW THIS LINE //
////////////////////////////////////////////

function updateOrientation(ghost) {
  var scaleX = 1;
  var scaleY = 1;

  if (ghost.speedX > 0) {
    scaleX = -1;
  } else if (ghost.speedX < 0) {
    scaleX = 1;
  }

  if (ghost.speedY > 0) {
    scaleY = -1;
  } else if (ghost.speedY < 0) {
    scaleY = 1;
  }

  $(ghost.id).css("transform", `scaleX(${scaleX}) scaleY(${scaleY})`);
}

function startProgram() {
  var $countdown = $("<div>").attr("id", "countdown-timer").css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "red",
    fontWeight: "bold",
    fontSize: "5em",
    textAlign: "center",
    zIndex: 9999,
    pointerEvents: "none",
    width: "100%",
  });

  $board.css("position", "relative");
  $countdown.appendTo($board);

  var countdownSeconds = initialDelay / 1000;
  $countdown.text("Starting in: " + countdownSeconds);

  var countdownInterval = setInterval(function () {
    countdownSeconds--;
    if (countdownSeconds > 0) {
      $countdown.text("Starting in: " + countdownSeconds);
    } else {
      $countdown.text("Go!");
      clearInterval(countdownInterval);
    }
  }, 1000);

  setTimeout(startInterval, initialDelay);

  function startInterval() {
    setInterval(update, 1000 / FPS);
    $countdown.remove();
  }
}

});