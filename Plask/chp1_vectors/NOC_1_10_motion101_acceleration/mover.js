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

module.exports = Mover;
