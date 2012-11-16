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
    var canvas = this.canvas;
    canvas.clear(255, 255, 255);

    this.mover.update();
    this.mover.checkEdges();
    this.mover.display();
  }
});



