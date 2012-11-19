/**
 * Forces (Gravity and Fluid Resistence) with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of multiple force acting on bodies (Mover class)
 * Bodies experience gravity continuously
 * Bodies experience fluid resistance when in "water"
 */

var plask = require('plask');

var Mover = require('./mover');
var Liquid = require('./liquid');

plask.simpleWindow({

  settings: {
    width: 800,
    height: 200
  },

  init: function() {
    var canvas = this.canvas;
    var paint = this.paint;
    paint.setAntiAlias(true);
    this.framerate(30);

    this.movers = [];
    this.reset();
    this.liquid = new Liquid(canvas, paint, 0, canvas.height / 2, canvas.width, canvas.height / 2, 0.1);
    this.on('mouseDown', function() {
      this.reset();
    }.bind(this));
  },

  draw: function() {
    var canvas = this.canvas;
    canvas.clear(255, 255, 255);
    canvas.drawText(this.paint, 'click mouse to reset', 10, 30);
    // Draw water
    this.liquid.display();

    for (var i = 0; i < this.movers.length; i++) {
      // Is the Mover in the liquid?
      var mover = this.movers[i];

      if (this.liquid.contains(mover)) {
        // Calculate drag force

        var dragForce = this.liquid.drag(mover);
        // Apply drag force to Mover
        mover.applyForce(dragForce);
      }

      // Gravity is scaled by mass here!
      var gravity = new plask.Vec2(0, 0.1 * mover.mass);
      // Apply gravity
      mover.applyForce(gravity);
      // Update and display
      mover.update();
      mover.display();
      mover.checkEdges();
    }
  },
  // Restart all the Mover objects randomly
  reset: function() {
    for (var i = 0; i < 11; i++) {
      this.movers[i] = new Mover(this.canvas, this.paint, 0.5 + 2.5 * Math.random(), 40 + i * 70, 0);
    }
  }
});








