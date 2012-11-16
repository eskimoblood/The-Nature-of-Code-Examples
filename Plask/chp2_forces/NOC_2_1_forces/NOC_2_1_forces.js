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

    this.mover = new Mover(this.canvas, paint);
  },

  draw: function() {
    var canvas = this.canvas, paint = this.paint;
    canvas.clear(255, 255, 255);


    var wind = new plask.Vec2(0.01, 0);
    var gravity = new plask.Vec2(0, 0.1);

    this.mover.applyForce(wind);
    this.mover.applyForce(gravity);

    // Update the location
    this.mover.update(this.mouseX, this.mouseY);
    // Display the Mover
    this.mover.display();
    this.mover.checkEdges();
  }
});








