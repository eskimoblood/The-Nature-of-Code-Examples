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
  this.topspeed = 6;
}

Mover.prototype = {
  update: function() {
    var angle = Math.random() * Math.PI * 2;
    var acceleration = new plask.Vec2(Math.cos(angle), Math.sin(angle));
    acceleration.scale(Math.random() * 2);

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
  },

  checkEdges: function() {

    if (this.location.x > this.canvas.width) {
      this.location.x = 0;
    }
    else if (this.location.x < 0) {
      this.location.x = this.canvas.width;
    }

    if (this.location.y > this.canvas.height) {
      this.location.y = 0;
    }
    else if (this.location.y < 0) {
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

    this.mover.update();
    this.mover.checkEdges();
    this.mover.display();
  }
});



