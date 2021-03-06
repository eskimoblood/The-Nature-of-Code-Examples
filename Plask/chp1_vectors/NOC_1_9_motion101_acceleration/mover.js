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

module.exports = Mover;
