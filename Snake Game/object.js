function Snake() {
  this.x = scl;
  this.y = scl;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.alive = 1;

  this.update = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  };

  this.show = function () {
    noStroke();
    var color = 255;
    for (var i = this.total - 1; i >= 0; i--) {
      color -= 5;
      fill(color);
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(255);
    rect(this.x, this.y, scl, scl);
  };

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      pickLocation();
      return true;
    } else {
      return false;
    }
  };

  this.wall = function () {
    if (
      this.x < scl ||
      this.y < scl ||
      this.x >= width - scl ||
      this.y >= height - scl
    ) {
      this.death();
    }
  };

  this.hit = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.death();
      }
    }
  };

  this.death = function () {
    noLoop();
    this.alive = 0;

    fill(256);
    textSize(50);
    text('GAME OVER', scl * 3, scl * 6);
    textSize(30);
    text('Length: ' + (this.total + 1), scl * 3, scl * 9);
  };
}

function Wall() {
  this.show = function () {
    noStroke();
    fill(236, 20, 20);
    rect(0, 0, width, scl);
    rect(0, 0, scl, height);
    rect(width - scl, 0, scl, height);
    rect(0, height - scl, height, scl);
  };
}
