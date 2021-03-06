/**
 * Acceleration with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of the basics of motion with vector.
 * A "Mover" object stores location, velocity, and acceleration as vectors
 * The motion is controlled by affecting the acceleration (in this case towards the mouse)
 */


var plask = require('plask');
var Mover = require('./mover');

plask.simpleWindow({

  settings: {
    width: 800,
    height: 200
  },

  init: function() {
    var paint = this.paint;
    paint.setAntiAlias(true);
    this.framerate(30);
    this.movers = [];
    for (var i = 0; i < 20; i++) {
      this.movers.push(new Mover(this.canvas, paint));
    }

    this.mouseX = 0;
    this.mouseY = 0;

    this.on('mouseMoved', function(e) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
  },

  draw: function() {
    var canvas = this.canvas;

    canvas.clear(255, 255, 255);

    this.movers.forEach(function(mover) {
      mover.update(this.mouseX, this.mouseY);
      mover.display();
    }, this)

  }
});




