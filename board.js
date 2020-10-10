import {ROWS, COLS, BLOCK_SIZE, COLORS, POINTS} from "./data.js";
import {checkValues} from "./helpers.js";

class Board {
  constructor() {
    this.grid = [];
    this.piece = null;
    this.cxt = null;
    this.lines = 0;
    this.game = null;
  }

  reset() {
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard() {
    return Array.from(Array(ROWS), () => Array(COLS).fill(0));
  }

  validMove(piece) {
    return piece.shape.every((row, y) => {
      return row.every((value, x) => {
        let nextX = piece.x + x;
        let nextY = piece.y + y;

        return (value === 0 || (this.isEmptyCell(nextX, nextY) && this.insideTheWalls(nextX, nextY)));
      })
    })
  }

  insideTheWalls(x, y) {
    return (x < COLS && x >= 0 && y < ROWS && y >= 0);
  }

  isEmptyCell(x, y) {
    return this.grid[y] && this.grid[y][x] === 0
  }
  // save shape on board
  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[this.piece.y + y][this.piece.x + x] = value;
        }
      });
    });
  }

  //draw all shapes on the Board
  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.cxt.fillStyle = COLORS[value - 1];
          this.cxt.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  getPointsByLines(lines) {
    if (this.lines === 1) {
      this.game.setScore(POINTS.SINGLE);
    } else if (this.lines === 2) {
      this.game.setScore(POINTS.DOUBLE);
    } else if (this.lines === 3) {
      this.game.setScore(POINTS.TRIPLE);
    } else if (this.lines > 4) {
      this.game.setScore(POINTS.TETRIS);
    }
  }


  clearLines() {
    this.grid.forEach((row, y) => {
      if (row.every(val => val > 0)) {
        this.lines++;

        //remove line
        this.grid.splice(y, 1);
        //add new line at the top
        this.grid.unshift(Array(COLS).fill(0));
      }
    });

    this.getPointsByLines(this.lines);

    //save lines for level
    this.game.setLines(this.lines);
    this.game.setLevel();
    this.lines = 0;
  }
}

export default Board;
