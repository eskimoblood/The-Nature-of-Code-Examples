var plask = require('plask');

function Mover(canvas, paint) {
  this.canvas = canvas;
  this.paint = paint;
  this.mass = 1;
  this.location = new plask.Vec2(400,50);
  this.velocity = new plask.Vec2(1, 0);
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
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, 16, 16);
  },

  checkEdges: function() {

    if (this.location.x > this.canvas.width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = this.canvas.width;
    }

    if (this.location.y > this.canvas.height) {
      this.velocity.y *= -1;
      this.location.y = this.canvas.height;
    }
  }
};

module.exports = Mover;

