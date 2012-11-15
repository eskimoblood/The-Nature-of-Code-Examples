/**
 * Acceleration with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of the basics of motion with vector.
 * A "Mover" object stores location, velocity, and acceleration as vectors
 * The motion is controlled by affecting the acceleration (in this case towards the mouse)
 */


var plask = require('plask');

function Mover(canvas, paint) {
  this.canvas = canvas;
  this.paint = paint;
  this.location = new plask.Vec2(30, 30);
  this.velocity = new plask.Vec2(0, 0);
  this.acceleration = new plask.Vec2(0, 0);
  this.mass = 1;
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
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, 48, 48);
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

    this.mover = new Mover(this.canvas, paint);
  },

  draw: function() {
    var canvas = this.canvas, paint = this.paint;
    canvas.clear(255, 255, 255);


    var wind = new plask.Vec2(0.01, 0);
    var gravity = new plask.Vec2(0, 0.1);

    this.mover.applyForce(wind);
    this.mover.applyForce(gravity);

    // Update the location
    this.mover.update(this.mouseX, this.mouseY);
    // Display the Mover
    this.mover.display();
    this.mover.checkEdges();
  }
});








