var Cell = function(i, j, width) {
  this.i = i;
  this.j = j;
  this.width = width;
  this.x = i*width;
  this.y = j*width;
  this.property = NONE;
}

Cell.prototype.display = function() {
  colorArray = boardColors[this.property]
  if (this.intercept(mouseX, mouseY)) {
    fill(255, 0, 0)
  } else {
    fill(colorArray[0], colorArray[1], colorArray[2])
  }
  rect(this.x,this.y,this.width,this.width)
  if (this.property != 0) {
    fill(0)
    textAlign(CENTER,CENTER)
    text(propertyString[this.property],this.x+this.width/2, this.y+this.width/2)
  }

}

Cell.prototype.intercept = function(x, y) {
  if (
    x > this.x &&
    x < this.x + this.width &&
    y > this.y &&
    y < this.y + this.width
  ) {
    return true
  }
  return false
}
