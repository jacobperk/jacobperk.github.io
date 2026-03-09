$(document).ready(function () {

//////////////////
  // initialization
  //////////////////

  var doubleMaxSpeed = 5;
  var maxGhosts = 10;
  var $board = $("#board");
  var boardWidth = $board.width();
  var boardHeight = $board.height();
  var ghosts = [];
  var ghostRadius = 10;

  // modify these values if you want faster moving ghosts or a shorter countdown timer
  const FPS = 25;
  const initialDelay = 5_000;

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

    // FIX (typo): maXX -> maxX
    ghost.x = Math.random() * maxX + ghostRadius;
    ghost.y = Math.random() * maxY + ghostRadius;

    ghost.speedX = decideSpeed();

    // FIX (typo): desideSpeed -> decideSpeed
    ghost.speedY = decideSpeed();

    const colors = [
      "#00f",
      "#f00",
      "#0f0",
      "#ff0",
      "#0ff",
      "#f0f",
      "#fff",
      "#fa0",
      "#0a0",
      "#a0f",
    ];
    ghost.color = colors[Math.floor(Math.random() * colors.length)];

    return ghost;
  }

  // FIX (logic): make speed range roughly -doubleMaxSpeed to +doubleMaxSpeed
  function decideSpeed() {
    return Math.random() * doubleMaxSpeed * 2 - doubleMaxSpeed;
  }

  function getId(number) {
    // FIX (syntax): removed stray "()"
    return "ghost" + number;
  }

  // FIX (syntax): funtion -> function
  function addNewGhostElement(ghost, id) {
    var $ghost = $("<img>")
      .attr("id", id)
      .attr("src", "img/ghost.png")
      .css("left", ghost.x)
      .css("top", ghost.y)
      .addClass("ghost");

    $ghost.appendTo($board);
  }

  //////////////////
  // update function
  //////////////////

  // FIX (syntax): function update) -> function update()
  function update() {
    for (var i = 0; i < maxGhosts; i++) {
      // FIX (typo): ghosts[j] -> ghosts[i]
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
    // FIX (logic): was overwriting x instead of moving it
    ghost.x += ghost.speedX;
    ghost.y += ghost.speedY;
  }

  function bounceGhost(ghost) {
    // Use the same limits used when placing the ghost
    var maxX = boardWidth - ghostRadius * 2;
    var maxY = boardHeight - ghostRadius * 2;

    // FIX (syntax): if (ghost.x < 0{ -> if (ghost.x < 0) {
    if (ghost.x < 0) {
      ghost.x -= ghost.speedX;
      ghost.speedX *= -1;
    } else if (ghost.x > maxX) {
      ghost.x -= ghost.speedX;
      ghost.speedX *= -1;
    }

    if (ghost.y < 0) {
      ghost.y -= ghost.speedY;
      ghost.speedY *= -1;
    } else if (ghost.y > maxY) {
      ghost.y -= ghost.speedY;

      // FIX (logic): bottom bounce must flip speedY (not speedX)
      ghost.speedY *= -1;
    }
  }

  function updateGhostOnScreen(ghost) {
    // FIX (logic): removing this line stops maxGhosts from becoming 1
    // maxGhosts = 1;

    $(ghost.id).css("left", ghost.x);
    $(ghost.id).css("top", ghost.y);

    $(ghost.id).css("transition", "left 0.2s linear, top 0.2s linear, filter 0.2s");
    $(ghost.id).css(
      "filter",
      `drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px ${ghost.color}) drop-shadow(0 0 12px ${ghost.color})`
    );
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
      "font-weight": "bold",
      "font-size": "5em",
      "text-align": "center",
      "z-index": 9999,
      "pointer-events": "none",
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