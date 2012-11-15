var plask = require('plask');

function Mover(canvas, paint, mass, x, y) {
  this.canvas = canvas;
  this.paint = paint;
  this.mass = mass;
  this.location = new plask.Vec2(x, y);
  this.velocity = new plask.Vec2(0, 0);
  this.acceleration = new plask.Vec2(0, 0);
}

Mover.prototype = {

  applyForce: function(force) {
    var f = new plask.Vec2(force.x / this.mass, force.y / this.mass);
    this.acceleration.add(f);
  },
  update: function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.scale(0);
  },

  display: function() {
    this.paint.setStroke();
    this.paint.setColor(0, 0, 0);
    this.paint.setStrokeWidth(2);
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, this.mass * 16, this.mass * 16);
  },

  checkEdges: function() {

    if (this.location.x > this.canvas.width) {
      this.location.x = this.canvas.width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (this.location.y > this.canvas.height) {
      this.velocity.y *= -1;
      this.location.y = this.canvas.height;
    }
  }
};


plask.simpleWindow({

  settings: {
    width: 800,
    height: 200
  },

  init: function() {
    var paint = this.paint;
    paint.setAntiAlias(true);
    this.framerate(30);

    this.movers = [];
    for (var i = 0; i < 20; i++) {
      var mass = 1 + Math.random() * 3;
      this.movers.push(new Mover(this.canvas, paint, mass, 0, 0));
    }

  },

  draw: function() {
    var canvas = this.canvas, paint = this.paint;
    canvas.clear(255, 255, 255);

    var wind = new plask.Vec2(0.01, 0);

    for (var i = 0; i < this.movers.length; i++) {

      var mover = this.movers[i];
      var gravity = new plask.Vec2(0, 0.1 * mover.mass);

      mover.applyForce(wind);
      mover.applyForce(gravity);

      mover.update();
      mover.display();
      mover.checkEdges();

    }
  }
});












