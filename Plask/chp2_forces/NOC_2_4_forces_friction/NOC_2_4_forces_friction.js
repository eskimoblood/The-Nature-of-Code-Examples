var plask = require('plask');

var Mover = require('./mover');


plask.simpleWindow({

  settings: {
    width: 383,
    height: 200
  },

  init: function() {
    var paint = this.paint;
    paint.setAntiAlias(true);
    this.framerate(30);

    this.movers = [];
    for (var i = 0; i < 5; i++) {
      var mass = 1 + Math.random() * 3;
      var x = Math.random() * this.canvas.width;
      this.movers.push(new Mover(this.canvas, paint, mass, x, 0));
    }

  },

  draw: function() {
    this.canvas.clear(255, 255, 255);

    var wind = new plask.Vec2(0.01, 0);

    for (var i = 0; i < this.movers.length; i++) {

      var mover = this.movers[i];
      var gravity = new plask.Vec2(0, 0.1 * mover.mass);

      var c = 0.05;

      if (mover.velocity.length()) {
        var friction = mover.velocity.dup();
        friction.scale(-1);
        friction.normalize();
        friction.scale(c);
        mover.applyForce(friction);
      }

      mover.applyForce(wind);
      mover.applyForce(gravity);

      mover.update();
      mover.display();
      mover.checkEdges();

    }
  }
});








