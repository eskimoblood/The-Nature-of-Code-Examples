var plask = require('plask');
var Mover = require('./mover');
var Attractor = require('./attractor');


plask.simpleWindow({

  settings: {
    width: 800,
    height: 200
  },

  init: function() {
    var canvas = this.canvas;
    var paint = this.paint;
    paint.setAntiAlias(true);
    this.framerate(60);
    this.movers = [];
    for (var i = 0; i < 10; i++) {
      var mass = 0.1 + Math.random() * 1.9;
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      this.movers.push(new Mover(canvas, paint, mass, x, y));
    }
    var a = this.a = new Attractor(canvas, paint);

    this.on('mouseDown', function(e) {
      a.clicked(e.x, e.y);
      this.mouseX = e.x;
      this.mouseY = e.y;
    });

    this.on('mouseUp', function() {
      a.stopDragging();
    });
    this.mouseX = 0;
    this.mouseY = 0;
    this.on('mouseDragged', function(e) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
  },

  draw: function() {
    var canvas = this.canvas;
    canvas.clear(255, 255, 255);
    this.a.drag(this.mouseX, this.mouseY);
    this.a.hover(this.mouseX, this.mouseY);
    this.a.display();

    for (var i = 0; i < this.movers.length; i++) {
      var mover = this.movers[i];
      var force = this.a.attract(mover);
      mover.applyForce(force);
      mover.update();

      mover.display();
    }
  }
});












