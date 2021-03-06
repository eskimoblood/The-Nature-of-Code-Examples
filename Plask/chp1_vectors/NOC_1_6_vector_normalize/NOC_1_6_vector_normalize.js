/**
 * Normalize
 * by Daniel Shiffman.
 *
 * Demonstration of normalizing a vector.
 * Normalizing a vector sets its length to 1.
 */

var plask = require('plask');

plask.simpleWindow({

  settings: {
    width: 800,
    height: 200
  },

  init: function() {
    var paint = this.paint;
    var canvas = this.canvas;

    paint.setAntiAlias(true);
    this.framerate(30);

    this.mouseX = 0;
    this.mouseY = 0;

    this.on('mouseMoved', function(e) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
    canvas.translate(canvas.width / 2, canvas.height / 2);
  },

  draw: function() {
    var canvas = this.canvas;
    var paint = this.paint;

    canvas.clear(255, 255, 255);

    var mouse = new plask.Vec2(this.mouseX, this.mouseY);
    var center = new plask.Vec2(canvas.width / 2, canvas.height / 2);
    mouse.sub(center);

    // Normalize the vector
    mouse.normalize();

    // Multiply its length by 150
    mouse.scale(150);

    // Draw the resulting vector
    paint.setStroke();
    paint.setColor(0, 0, 0);
    paint.setStrokeWidth(2);
    canvas.drawLine(paint, 0, 0, mouse.x, mouse.y);
  }
});



