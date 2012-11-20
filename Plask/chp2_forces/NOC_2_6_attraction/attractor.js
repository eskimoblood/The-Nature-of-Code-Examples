// Attraction
// Daniel Shiffman <http://www.shiffman.net>

// A class for a draggable attractive body in our world

var plask = require('plask');

function Attractor(canvas, paint) {
  this.canvas = canvas;
  this.paint = paint;

  this.location = new plask.Vec2(canvas.width / 2, canvas.height / 2);// Location
  this.mass = 20;// Mass, tied to size
  this.G = 1; // Gravitational Constant
  this.dragOffset = new plask.Vec2(0.0, 0.0);// holds the offset for when object is clicked on
  this.dragging = false; // Is the object being dragged?
  this.rollover = false; // Is the mouse over the ellipse?
}

Attractor.prototype = {

  attract: function(m) {

    var force = this.location.subbed(m.location);         // Calculate direction of force

    var d = force.length();                               // Distance between objects
    d = plask.clamp(d, 5.0, 25.0);                          // Limiting the distance to eliminate "extreme" results for very close or very far objects
    force.normalize();                                    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    var strength = (this.G * this.mass * m.mass) / (d * d);  // Calculate gravitional force magnitude
    force.scale(strength);                                  // Get force vector --> magnitude * direction
    return force;
  },

// Method to display
  display: function() {
    this.paint.setStyle(this.paint.kFillStyle)
    if (this.dragging) {
      this.paint.setColor(50, 50, 50);
    } else if (this.rollover) {
      this.paint.setColor(100, 100, 100);
    } else {
      this.paint.setColor(175, 175, 175, 200);
    }
    this.canvas.drawCircle(this.paint, this.location.x, this.location.y, this.mass * 2, this.mass * 2);
  },

// The methods below are for mouse interaction
  clicked: function(mx, my) {
    var d = this.location.dist(new plask.Vec2(mx, my));
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.location.x - mx;
      this.dragOffset.y = this.location.y - my;
    }
  },

  hover: function(mx, my) {
    var d = this.location.dist(new plask.Vec2(mx, my));
    this.rollover = d < this.mass;
  },

  stopDragging: function() {
    this.dragging = false;
  },

  drag: function(mouseX, mouseY) {
    if (this.dragging) {
      this.location.x = mouseX + this.dragOffset.x;
      this.location.y = mouseY + this.dragOffset.y;
    }
  }
}

module.exports = Attractor;
