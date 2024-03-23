class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  addInPlace(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  sub(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  mult(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  div(scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.length();
    return new Vector(this.x / mag, this.y / mag);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  drawFill(draw, color, offset = { x: 0, y: 0 }, radius = 5) {
    draw.beginPath();
    draw.fillStyle = color;
    draw.arc(this.x + offset.x, this.y + offset.y, radius, 0, 2 * Math.PI);
    draw.fill();
  }

  drawStroke(draw, color, offset = { x: 0, y: 0 }, radius = 5) {
    draw.beginPath();
    draw.strokeStyle = color;
    draw.arc(this.x + offset.x, this.y + offset.y, radius, 0, 2 * Math.PI);
    draw.stroke();
  }
}
