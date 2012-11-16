var plask = require('plask');

function Mover(canvas, paint) {
  this.canvas = canvas;
  this.paint = paint;
  this.location = new plask.Vec2(Math.random() * canvas.width, Math.random() * canvas.height);
  this.velocity = new plask.Vec2(-2 + Math.random() * 4, - 2 + Math.random() * 4);
}

Mover.prototype = {
  update: function() {
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
