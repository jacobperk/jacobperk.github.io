$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

      // TODO 1 - Enable the Grid
     // toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(200,700,60,10,"green")
    createPlatform(400,650,50,15,"yellow")
    createPlatform(250,530,40,10,"gray")
    createPlatform(500,450,30,50,"pink")
    createPlatform(700,400,50,10,"blue")
    createPlatform(1000,500,20,10,"red")





    // TODO 3 - Create Collectables
    createCollectable("steve", 850, 200);
createCollectable("steve", 220, 300);
createCollectable("steve",1100, 600 )



    
    // TODO 4 - Create Cannons
    createCannon("top", 300, 700);
createCannon("right", 300, 700);
createCannon("right", 770, 700)


    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
