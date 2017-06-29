var Player = function() {
  this.hand = []
}

Player.prototype.draw = function() {
  remaining = 7 - this.hand.length
  for (var i = 0; i < remaining; i++) {
    randomElement = deck.splice(Math.floor(Math.random()*deck.length),1)[0]
    this.hand.push(new Hand(this.hand.length, 50, randomElement))
  }
}
