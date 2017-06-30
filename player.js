var Player = function() {
  this.hand = [null,null,null,null,null,null,null]
  this.score = 0
}

Player.prototype.draw = function() {
  for (var i = 0; i < this.hand.length; i++) {
    if (this.hand[i] == null) {
      randomElement = deck.splice(Math.floor(Math.random()*deck.length),1)[0]
      this.hand[i] = new Hand(i, 50, randomElement)
    }
  }
}
