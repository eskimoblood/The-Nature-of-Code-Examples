// The Nature of Code
// Daniel Shiffman
// Draft book

// Example 1-5: Vector magnitude
var plask = require('plask');

plask.simpleWindow({

  settings: {
    width: 800,
    height: 200
  },

  init: function() {
    var paint = this.paint;

    paint.setAntiAlias(true);
    this.framerate(30);

    this.mouseX = 0;
    this.mouseY = 0;

    this.on('mouseMoved', function(e) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });

  },

  draw: function() {
    var canvas = this.canvas;
    var paint = this.paint;

    canvas.clear(255, 255, 255);

    var mouse = new plask.Vec2(this.mouseX, this.mouseY);
    var center = new plask.Vec2(canvas.width / 2, canvas.height / 2);
    mouse.sub(center);

    var m = mouse.length();
    paint.setFill();
    paint.setColor(0, 0, 0);
    canvas.drawRect(paint, 0, 0, m, 10);

    canvas.save();
    canvas.translate(canvas.width / 2, canvas.height / 2);
    paint.setStroke();
    paint.setColor(0, 0, 0);
    paint.setStrokeWidth(2);
    canvas.drawLine(paint, 0, 0, mouse.x, mouse.y);
    canvas.restore();
  }
});

