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
var resetButton = document.querySelectorAll(".buttonGroup")[0]
var varifyButton = document.querySelectorAll(".buttonGroup")[1]


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
  canvas = createCanvas(canvas_width,canvas_height)
  canvas.parent("canvasDiv")
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
currentTurnPlaced = []

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
    selected.x = mouseX - selected.width/2
    selected.y = mouseY - selected.width/2
  }
}

function mouseReleased() {
  if (selected != null) {
    for (var i = 0; i < numCol; i++) {
      for (var j = 0; j < numRow; j++) {
        if (board[i][j].intercept(mouseX, mouseY) && !board[i][j].occupied) {
          board[i][j].occupied = selected
          currentTurnPlaced.push(board[i][j])
          selected.placed = board[i][j];
        } else {
          selected.x = selected.originX
          selected.y = selected.originY
        }
      }
    }
    selected = null
  }
}

function resetTile() {
  players[0].hand.forEach(function(element) {
    element.placed = null;
    element.x = element.originX;
    element.y = element.originY;
  })

  currentTurnPlaced.forEach(function(element) {
    element.occupied = null;
  })
  currentTurnPlaced = []
}

function varifyTiles() {
  if (currentTurnPlaced.length > 0){
    first = currentTurnPlaced[0]

    if (currentTurnPlaced.every(function(element) {
      return element.i == first.i
    }) || currentTurnPlaced.every(function(element) {
      return element.j == first.j
    })) {
      return true;
    }
  }
  return false;
}

function varify() {
  if (varifyTiles()) {
    players[0].score += calculateSum()
    currentTurnPlaced.forEach(function(element) {
      players[0].hand[players[0].hand.indexOf(element.occupied)] = null
    })
    players[0].draw()
    currentTurnPlaced = []
    console.log(players[0].score);
  } else {
    resetTile()
  }
}

function calculateSum() {
  total = 0
  multiplier = 1
  currentTurnPlaced.forEach(function(element){
    baseScore = tiles[element.occupied.word][0]
    if (element.property == 1) {
      baseScore *= 2
    } else if (element.property == 2) {
      baseScore *= 3
    } else if (element.property == 3) {
      multiplier *= 2
    } else if (element.property == 4) {
      multiplier *= 3
    }
    total += baseScore
  })
  total *= multiplier
  return total
}

resetButton.addEventListener("click", resetTile)
varifyButton.addEventListener("click", varify)
