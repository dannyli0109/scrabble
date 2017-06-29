var board = []
var deck = []
var players = []
var turn = 0

var numRow = 15
var numCol = 15
var canvas_width = 751
var canvas_height = 851
var NONE = 0
var DOUBLE_LETTER = 1
var TRIBLE_LETTER = 2
var DOUBLE_WORD = 3
var TRIBLE_WORD = 4
var whiteC = [255, 255, 255]
var lightBlueC = [173,216,230]
var darkBlueC =  [65,105,225]
var pinkC = [255,182,193]
var orangeC = [255,165,0]
var boardColors = [whiteC, lightBlueC, darkBlueC, pinkC, orangeC]
var propertyString = ["", "DL", "TL", "DW", "TW"]


function initBoard(){
  board = []
  for (var j = 0; j < numRow; j++) {
    var rowArray = []
    for (var i = 0; i < numCol; i++) {
      rowArray.push(new Cell (i, j, 50))
    }
    board.push(rowArray)
  }

  for (var i = 0; i < numCol; i++) {
    if (i == 0 || i == 14) {
      board[i][0].property = TRIBLE_WORD
      board[i][3].property = DOUBLE_LETTER
      board[i][7].property = TRIBLE_WORD
      board[i][11].property = DOUBLE_LETTER
      board[i][14].property = TRIBLE_WORD
    }

    if (i == 1 || i == 13) {
      board[i][1].property = DOUBLE_WORD
      board[i][5].property = TRIBLE_LETTER
      board[i][9].property = TRIBLE_LETTER
      board[i][13].property = DOUBLE_WORD
    }

    if (i == 2 || i == 12) {
      board[i][2].property = DOUBLE_WORD
      board[i][6].property = DOUBLE_LETTER
      board[i][8].property = DOUBLE_LETTER
      board[i][12].property = DOUBLE_WORD
    }

    if (i == 3 || i == 11) {
      board[i][0].property = DOUBLE_LETTER
      board[i][3].property = DOUBLE_WORD
      board[i][7].property = DOUBLE_LETTER
      board[i][11].property = DOUBLE_WORD
      board[i][14].property = DOUBLE_LETTER
    }

    if (i == 4 || i == 10) {
      board[i][4].property = DOUBLE_WORD
      board[i][10].property = DOUBLE_WORD
    }

    if (i == 5 || i == 9) {
      board[i][1].property = TRIBLE_LETTER
      board[i][5].property = TRIBLE_LETTER
      board[i][9].property = TRIBLE_LETTER
      board[i][13].property = TRIBLE_LETTER
    }

    if (i == 6 || i == 8) {
      board[i][2].property = DOUBLE_LETTER
      board[i][6].property = DOUBLE_LETTER
      board[i][8].property = DOUBLE_LETTER
      board[i][12].property = DOUBLE_LETTER
    }

    if (i == 7) {
      board[i][0].property = TRIBLE_WORD
      board[i][3].property = DOUBLE_LETTER
      board[i][7].property = DOUBLE_WORD
      board[i][11].property = DOUBLE_LETTER
      board[i][14].property = TRIBLE_WORD
    }
  }
  return board
}

function initDeck() {
  deck = []
  for (key in tiles) {
    for (var i = 0; i < tiles[key][1]; i++) {
      deck.push(key)
    }
  }
  return deck
}

function initPlayer(num) {
  players = []
  for (var i = 0; i < num; i++) {
    players.push(new Player())
  }
  for (var i = 0; i < players.length; i++) {
    players[i].draw()
  }
  return players
}


function setup() {
  createCanvas(canvas_width,canvas_height)
  deck = initDeck()
  board = initBoard()
  players = initPlayer(1)
  turn = 0
}

function draw() {
  background(255)
  stroke(0)
  fill(255)
  for (var i = 0; i < numCol; i++) {
    for (var j = 0; j < numRow; j++) {
      if (board[i][j].intercept(mouseX, mouseY)) {
        fill(255, 0, 0)
      } else {
        fill(255)
      }
      board[i][j].display()
    }
  }
  for (var i = 0; i < players.length; i++) {
    players[i].hand.forEach(function(element) {
      element.display()
    })
  }
}

selected = null

function mousePressed() {
  players[0].hand.forEach(function(element) {
    if (element.intercept(mouseX, mouseY)) {
      selected = element
    }
  })
}

function mouseDragged() {
  if (selected != null) {
    originX = selected.x
    originY = selected.y
    selected.x = mouseX
    selected.y = mouseY
  }
}
