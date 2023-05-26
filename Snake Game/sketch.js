var scl = 20;
var s;
var w;
var food;

function setup() {
  createCanvas(740, 740);
  s = new Snake();
  w = new Wall();
  frameRate(5);
  pickLocation();
}

function draw() {
  background(45);
  w.show();
  s.update();
  s.show();
  s.eat(food);

  fill(102, 180, 71);
  rect(food.x, food.y, scl, scl);

  s.wall();
  s.hit();
}

function keyPressed() {
  if (s.alive === 0) {
    location.reload();
  } else if ((keyCode === UP_ARROW || keyCode === 87) && abs(s.yspeed) !== 1) {
    s.dir(0, -1);
  } else if (
    (keyCode === DOWN_ARROW || keyCode === 83) &&
    abs(s.yspeed) !== 1
  ) {
    s.dir(0, 1);
  } else if (
    (keyCode === RIGHT_ARROW || keyCode === 68) &&
    abs(s.xspeed) !== 1
  ) {
    s.dir(1, 0);
  } else if (
    (keyCode === LEFT_ARROW || keyCode === 65) &&
    abs(s.xspeed) !== 1
  ) {
    s.dir(-1, 0);
  }
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  var fr = floor(5 + pow(s.total, 2) / 20);
  var f = 0;
  do {
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
    for (var i = 0; i < s.tail.length; i++) {
      var pos = s.tail[i];
      var d = dist(food.x, food.y, pos.x, pos.y);
      if (d < 1) {
        f = 1;
      }
    }
  } while (
    food.x < scl ||
    food.y < scl ||
    food.x >= width - scl ||
    food.y >= height - scl ||
    f
  );
  if (fr < 25) frameRate(fr);
  else frameRate(25);
}
