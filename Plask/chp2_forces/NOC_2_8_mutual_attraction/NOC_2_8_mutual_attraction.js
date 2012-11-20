var plask = require('plask');
var Mover = require('./mover');
plask.simpleWindow({

    settings: {
      width: 800,
      height: 200
    },

    init: function() {
      var paint = this.paint;
      var canvas = this.canvas;

      paint.setAntiAlias(true);
      this.framerate(60);
      this.movers = [];
      for (var i = 0; i < 20; i++) {
        var mass = 0.1 + Math.random() * 1.9;
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        this.movers.push(new Mover(canvas, paint, mass, x, y));
      }
    },

    draw: function() {
      var canvas = this.canvas;
      canvas.clear(255, 255, 255);

      for (var i = 0; i < this.movers.length; i++) {
        for (var j = 0; j < this.movers.length; j++) {
          if (i != j) {
            var force = this.movers[j].attract(this.movers[i]);
            this.movers[i].applyForce(force);
          }
        }

        this.movers[i].update();
        this.movers[i].display();
      }

    }
  }
);













