var Hand = function(i, width, word) {
  this.i = i
  this.width = width
  this.x = i * width + (400/8 * i) + 400/8
  this.y = canvas_height - 75
  this.word = word
}

Hand.prototype.display = function() {
  if (this.intercept(mouseX, mouseY)) {
    fill(255,0,0)
  } else {
    fill(255)
  }
  rect(this.x,this.y,this.width, this.width)
  fill(0)
  textAlign(CENTER,CENTER)
  textSize(20)
  text(this.word,this.x+this.width/2, this.y+this.width/2)
}

Hand.prototype.intercept = function(x, y) {
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
