/**
 * Forces (Gravity and Fluid Resistence) with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of multiple force acting on bodies (Mover class)
 * Bodies experience gravity continuously
 * Bodies experience fluid resistance when in "water"
 */

var plask = require('plask');

function Mover(canvas, paint, m, x, y) {
  console.log(x, y);
  this.canvas = canvas;
  this.paint = paint;
  this.mass = m;
  this.location = new plask.Vec2(x, y);
  console.log(this.location);
  this.velocity = new plask.Vec2(0, 0);
  this.acceleration = new plask.Vec2(0, 0);
}

Mover.prototype = {
// Newton's 2nd law: F = M * A
// or A = F / M
  applyForce: function(force) {
    // Divide by mass
    var f = new plask.Vec2(force.x / this.mass, force.y / this.mass);
    // Accumulate all forces in acceleration
    this.acceleration.add(f);
  },

  update: function() {

    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // Location changes by velocity
    this.location.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.scale(0);
  },

// Draw Mover
  display: function() {
    this.paint.setStroke();
    this.paint.setColor(0, 0, 0);
    this.paint.setStrokeWidth(2);
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, this.mass * 16, this.mass * 16);
  },

// Bounce off bottom of window
  checkEdges: function() {
    if (this.location.y > this.canvas.height) {
      this.velocity.y *= -0.9;  // A little dampening when hitting the bottom
      this.location.y = this.canvas.height;
    }
  }
}


module.exports = Mover;
