var plask = require('plask');
var Mover = require('./mover')

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
      var mass = 1 + Math.random() * 3;
      this.movers.push(new Mover(this.canvas, paint, mass, 0, 0));
    }

  },

  draw: function() {
    var canvas = this.canvas, paint = this.paint;
    canvas.clear(255, 255, 255);

    var wind = new plask.Vec2(0.01, 0);

    for (var i = 0; i < this.movers.length; i++) {

      var mover = this.movers[i];
      var gravity = new plask.Vec2(0, 0.1 * mover.mass);

      mover.applyForce(wind);
      mover.applyForce(gravity);

      mover.update();
      mover.display();
      mover.checkEdges();

    }
  }
});












