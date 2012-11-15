// The Nature of Code
// Daniel Shiffman
// Draft book

var plask = require('plask');

// Example 1-1: Bouncing Ball, no vectors

var x = 100;
var y = 100;
var xspeed = 2.5;
var yspeed = 2;

plask.simpleWindow({

    settings: {
      width: 800,
      height: 200
    },

    init: function() {
      var paint = this.paint;
      paint.setAntiAlias(true);
      paint.setAntiAlias(true);
      this.framerate(30);
    },

    draw: function() {
      var canvas = this.canvas;
      var paint = this.paint;
      canvas.clear(255, 255, 255);

      // Add the current speed to the location.
      x = x + xspeed;
      y = y + yspeed;

      if ((x > canvas.width) || (x < 0)) {
        xspeed = xspeed * -1;
      }
      if ((y > canvas.height) || (y < 0)) {
        yspeed = yspeed * -1;
      }


      // Display circle at x location

      paint.setStroke();
      paint.setColor(0, 0, 0);
      paint.setStrokeWidth(2);
      canvas.drawCircle(paint, x, y, 48, 48);
    }
  }
);



