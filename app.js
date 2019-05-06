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

  updateAndCheck(row, col) {
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
var currentGame = new Board();
var players = ['', ''];

// set up a new board for each game
var startNewGame = function () {
  currentGame = new Board();
};
