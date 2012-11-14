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
  this.location = new plask.Vec2(canvas.width / 2, canvas.height / 2);
  this.velocity = new plask.Vec2(0, 0);
  this.topspeed = 5;
}

Mover.prototype = {
  update: function(mouseX, mouseY) {
    var mouse = new plask.Vec2(mouseX, mouseY);
    var acceleration = mouse.subbed(this.location);

    acceleration.normalize();
    acceleration.scale(0.2);

    this.velocity.add(acceleration);
    this.velocity.x = Math.min(this.velocity.x, this.topspeed);
    this.velocity.y = Math.min(this.velocity.y, this.topspeed);
    this.location.add(this.velocity);
  },

  display: function() {
    this.paint.setStroke();
    this.paint.setColor(0, 0, 0);
    this.paint.setStrokeWidth(2);
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, 48, 48);
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

    this.mouseX = 0;
    this.mouseY = 0;

    this.on('mouseMoved', function(e) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
  },

  draw: function() {
    var canvas = this.canvas, paint = this.paint;
    canvas.clear(255, 255, 255);

    // Update the location
    this.mover.update(this.mouseX, this.mouseY);
    // Display the Mover
    this.mover.display();
  }
});



