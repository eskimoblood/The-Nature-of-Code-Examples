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

    this.m = new Mover(canvas, paint);
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
    var force = this.a.attract(this.m);
    this.m.applyForce(force);
    this.m.update();

    this.a.drag(this.mouseX, this.mouseY);
    this.a.hover(this.mouseX, this.mouseY);

    this.a.display();
    this.m.display();
  }
});



