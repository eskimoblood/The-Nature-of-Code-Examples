var plask = require('plask');

function Mover(canvas, paint, mass, x, y) {
  this.canvas = canvas;
  this.paint = paint;
  this.location = new plask.Vec2(x, y);
  this.velocity = new plask.Vec2(1, 0);
  this.acceleration = new plask.Vec2(0, 0);
  this.mass = mass;
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
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, this.mass * 25, this.mass * 25);
  }
};

module.exports = Mover;

