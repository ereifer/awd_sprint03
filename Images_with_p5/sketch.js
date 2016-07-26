var bgImage;

var george;
var georgeCollided = false;

var carGroup;

var crash;

var storyBox;

//create class car - to encapsalate properties and functions that are part of the same object
 var car = function(theSpeed, theLane, theColor) {
   this.init(theSpeed, theLane, theColor);
 }
  car.prototype.laneOne = 480;
  car.prototype.laneTwo= 300;
  car.prototype.laneThree= 110;
  car.prototype.carColors = {
    "red":"RedCar.png",
    "orange":"OrangeCar.png",
    "yellow":"YellowCar.png",
    "green":"GreenCar.png",
    "turquoise":"TurquoiseCar.png"
  };
  car.prototype.init = function (theSpeed, theLane, theColor) {
    this.speed = theSpeed;

    if (theLane == 1){
      this.lane = this.laneOne;
    } else if (theLane == 2){
      this.lane = this.laneTwo;
    } else if (theLane == 3){
      this.lane = this.laneThree;
    }

    this.color = theColor;

  this.theSprite = createSprite(100, this.lane, 50, 50);
  this.theSprite.scale = 0.5;
  this.theSprite.addAnimation("floating", this.carColors[this.color]);
  this.theSprite.addSpeed(this.speed, 180);
  carGroup.add(this.theSprite);
  this.theSprite.collide(carGroup, function(){
    console.log("car collided");
  });

};

function preload(){
  crash = loadSound('independent.mp3');
  bgImage = loadImage('Threelanes.png');
  // redCar = loadImage('RedCar.png');
  // orangeCar = loadImage('OrangeCar.png');
  // yellowCar = loadImage('YellowCar.png');
  // greenCar = loadImage('GreenCar.png');
  // turquoiseCar = loadImage('TurquoiseCar.png');
}

function setup() {
  carGroup = new Group(); // for collisions
  bgImage = loadImage("Threelanes.png");
  createCanvas(800,600);

  george = createSprite(400, 600, 200, 200);
  george.scale = 0.5;
  george.addAnimation("floating", 'george.png');

  storyBox = select('#story-text');

  carArr = []; // empty array and push 3 new cars onto it
  carArr.push( new car(-2, 1, "orange") );
  carArr.push( new car(-3, 2, "green") );
  carArr.push( new car(-4, 3, "yellow") );
}

function draw() {
  imageMode(CORNERS);
  background(bgImage);

  drawSprites();

  //Move position
  if (keyIsDown(LEFT_ARROW)){
    george.setVelocity(-5,0);
    window.setTimeout( // need in order to stop movement
      function() {
        george.setVelocity(0,0);
      }, 200
    );
  }
  if (keyIsDown(RIGHT_ARROW)){
    george.setVelocity(5,0);

    window.setTimeout(
      function() {
        george.setVelocity(0,0);
      }, 200
    );
  }
  if (keyIsDown(UP_ARROW)){
    george.setVelocity(0,-5);
    window.setTimeout(
      function() {
        george.setVelocity(0,0);
      }, 200
    );
  }
  if (keyIsDown(DOWN_ARROW)){
    george.setVelocity(0, 5);
    window.setTimeout(
      function() {
        george.setVelocity(0,0);
      }, 200
    );
  }

// car collision
  for(var i=0;i<carArr.length;i++) {
     carArr[i].theSprite.collide(carGroup, function(){
      // console.log("car collided");
    });
  }

// george collides with any of the cars
  george.collide(carGroup, function (){
    // console.log("george collided");
    if (georgeCollided == false){
      crash.play();
      storyBox.html("No soup for you!");
    }
    georgeCollided = true;
  })

  //Draw image
  imageMode(CENTER);

  //End draw
}

  window.setInterval(
    function() {
      // console.log("Checking Sprites");
      if (carArr.length < 7){
        // random speeds, lanes, 
        var speed = Math.floor(Math.random() * 3) - 3;
        var lane = Math.floor(Math.random() * 3) + 1;
        carArr.push( new car(speed, lane, 'orange') );

      }
        for(var i=0;i<carArr.length;i++) {
            var thePosition = carArr[i].theSprite.position;
            //console.log("Car:"+i+" Pos:"+thePosition.x);
            if(thePosition.x > 800) {
              carArr[i].theSprite.remove();
              delete carArr[i];
              carArr.splice(i,1);  
            }
        }

    }, 2000
  );