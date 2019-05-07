class Board {
  constructor() {
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

    if (Number(row) + Number(col) === 2 && ++player.min === 3) {
      return true;
    }
    return false;
  }
};

class View {
  constructor() {
  }

  startNewGame() {
    currentGame.board.player1.name = currentGame.player1;
    currentGame.board.player2.name = currentGame.player2;

    var currentPlayer = document.getElementById('turn');
    currentPlayer.innerText = currentGame.board.player1.name + ': you start!';
  }

  clearTiles() {
    var tiles = document.getElementsByClassName('tile');
    for (let tile of tiles) {
      tile.innerText = '';
    }
  }

  updateGame(tile) {
    if (tile.innerText) {
      alert('Invalid selection! Please pick again');
      return;
    }

    var mark = currentGame.board.count % 2 === 0 ? 'X' : 'O';
    tile.innerText = mark;

    var row = tile.classList[1].substring(5, 6);
    var col = tile.classList[1].substring(7, 8);
    currentGame.board.toggle(row, col, mark);

    if (currentGame.board.checkWin(row, col)) {
      var player = currentGame.board.getPlayer().name;
      alert(`Congrats! ${player} has won the game!`);
      if (player === currentGame.player1) {
        currentGame.player1Score++;
      } else {
        currentGame.player2Score++;
      }
      currentGame.view.displayPlayerNamesAndScores();
      return;
    }

    if (++currentGame.board.count > 9) {
      alert('No winner. Try again!');
    }
  }

  updateTurn() {
    var currentPlayer = document.getElementById('turn');
    var player = currentGame.board.getPlayer().name;
    currentPlayer.innerText = player + ': your turn!';
  }

  getPlayerNames() {
    currentGame.player1 = (prompt('Player 1\'s name: ') || 'husky').toLowerCase();
    currentGame.player2 = (prompt('Player 2\'s name: ') || 'pomeranian').toLowerCase();
  }

  displayPlayerNamesAndScores() {
    var p1 = document.getElementById("player1");
    p1.innerText = `player 1: ${currentGame.player1}, score: ${currentGame.player1Score}`;

    var p2 = document.getElementById("player2");
    p2.innerText = `player 2: ${currentGame.player2}, score: ${currentGame.player2Score}`;
  }

}

var currentGame = {
  board: [],
  view: {},
  player1: '',
  player2: '',
  player1Score: 0,
  player2Score: 0
};


window.onload = (event) => {
  currentGame.board = new Board();

  currentGame.view = new View();
  currentGame.view.getPlayerNames();
  currentGame.view.displayPlayerNamesAndScores();
  currentGame.view.startNewGame();
};