// The Nature of Code
// Daniel Shiffman
// Draft book

// Example 1-2: Bouncing Ball, with PVector!

var plask = require('plask');

plask.simpleWindow({

    settings: {
      width: 200,
      height: 200
    },

    init: function() {
      var paint = this.paint;
      paint.setAntiAlias(true);
      this.framerate(30);
      this.location = new plask.Vec2(100, 100);
      this.velocity = new plask.Vec2(2.5, 5);
    },

    draw: function() {
      var canvas = this.canvas;
      var paint = this.paint;

      canvas.drawColor(255, 255, 255, 10);
      // Add the current speed to the location.
      this.location.add(this.velocity);

      if ((this.location.x > canvas.width) || (this.location.x < 0)) {
        this.velocity.x = this.velocity.x * -1;
      }
      if ((this.location.y > canvas.height) || (this.location.y < 0)) {
        this.velocity.y = this.velocity.y * -1;
      }

      // Display circle at x location
      paint.setStroke();
      paint.setColor(0, 0, 0);
      canvas.drawCircle(paint, this.location.x, this.location.y, 16, 16);

    }
  }
);



