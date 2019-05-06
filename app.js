class Board {
  constructor(props) {
    this.board = [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']];

    this.player1 = {
      name: '',
      rows: { 0: 0, 1: 0, 2: 0 },
      cols: { 0: 0, 1: 0, 2: 0 },
      maj: 0,
      min: 0
    };

    this.player2 = {
      name: '',
      rows: { 0: 0, 1: 0, 2: 0 },
      cols: { 0: 0, 1: 0, 2: 0 },
      maj: 0,
      min: 0
    };

    this.count = 0;
  }

  toggle(row, col, mark) {
    this.board[row][col] = mark;
  }

  getPlayer() {
    return this.count % 2 === 0 ? this.player1 : this.player2;
  }

  checkWin(row, col) {
    var player = this.getPlayer();
    if (++player.rows[row] === 3) {
      return true;
    }
    if (++player.cols[col] === 3) {
      return true;
    }

    if (row === col && ++player.maj === 3) {
      return true;
    }

    if (row + col === 2 && ++player.min === 3) {
      return true;
    }
    return false;
  }
};

// current board
var currentGame;
var player1 = '';
var player2 = '';

// set up a new board for each game
var startNewGame = function () {
  currentGame = new Board();
  currentGame.player1.name = player1;
  currentGame.player2.name = player2;

  var currentPlayer = document.getElementById('turn');
  currentPlayer.innerText = player1 + ': you start!';
};

// clear up the tiles for new board game
var clearTiles = function () {
  var tiles = document.getElementsByClassName('tile');
  for (let tile of tiles) {
    tile.innerText = '';
  }
}

// update display and board details when tile is clicked on
var updateGame = function (tile) {
  if (tile.innerText) {
    alert('Invalid selection! Please pick again');
    return;
  }

  var mark = currentGame.count % 2 === 0 ? 'X' : 'O';
  tile.innerText = mark;

  var row = tile.classList[1].substring(5, 6);
  var col = tile.classList[1].substring(7, 8);
  currentGame.toggle(row, col, mark);

  if (currentGame.checkWin(row, col)) {
    var player = currentGame.getPlayer().name;
    alert(`Congrats! ${player} has won the game!`);
    return;
  }

  if (++currentGame.count > 9) {
    alert('No winner. Try again!');
  }
}

var updateTurn = function () {
  var currentPlayer = document.getElementById('turn');
  var player = currentGame.getPlayer().name;
  currentPlayer.innerText = player + ': your turn!';
} 
