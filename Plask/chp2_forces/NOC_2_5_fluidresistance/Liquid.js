/**
 * Forces (Gravity and Fluid Resistence) with Vectors
 * by Daniel Shiffman.
 *
 * Demonstration of multiple force acting on bodies (Mover class)
 * Bodies experience gravity continuously
 * Bodies experience fluid resistance when in "water"
 */

// Liquid class
function Liquid(canvas, paint, x_, y_, w_, h_, c_) {
  this.canvas = canvas;
  this.paint = paint;
  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.h = h_;
  this.c = c_;
}

Liquid.prototype = {

  // Is the Mover in the Liquid?
  contains: function(m) {
    var l = m.location;
    return l.x > this.x && l.x < this.x + this.w && l.y > this.y && l.y < this.y + this.h;
  },

  // Calculate drag force
  drag: function(m) {
    // Magnitude is coefficient * speed squared
    var speed = m.velocity.length();
    var dragMagnitude = this.c * speed * speed;

    // Direction is inverse of velocity

    var dragForce = m.velocity.dup();
    dragForce.scale(-1);

    // Scale according to magnitude
    // dragForce.setMag(dragMagnitude);
    dragForce.normalize();
    dragForce.scale(dragMagnitude);
    return dragForce;
  },

  display: function() {
    this.paint.setColor(50, 50, 50);
    this.canvas.drawRect(this.paint, this.x, this.y, this.w, this.h);
  }

};

module.exports = Liquid;
