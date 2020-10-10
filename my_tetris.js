import {ROWS, COLS, BLOCK_SIZE, KEY, POINTS, LEVEL} from "./data.js";
import Shape from "./shapes.js";
import Board from "./board.js";
import {rotateShapeClockwise, rotateShapeCounterClockwise, countTimer} from "./helpers.js";
import GameModel from "./game-model.js";

const canvas = document.getElementById("board");
const canvasNextShapeBoard = document.getElementById("nextShapeBoard");
const canvasHoldShapeBoard = document.getElementById("holdShapeBoard");
const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");
const restartButton = document.querySelector(".restart-button");
const scoreElement = document.querySelector(".game-score-nmb");
const levelElement = document.querySelector(".game-level-nmb");
const linesElement = document.querySelector(".game-lines-nmb");
const holdButton = document.querySelector(".hold-button");
const counterElement = document.querySelector(".counter-nmb");
const counterWrap = document.querySelector(".counter");
const audioButton = document.querySelector(".music-button");
const popupGameOver = document.querySelector(".popup-game-over");
const popupGameWin = document.querySelector(".popup-game-win");
const gameHours = document.querySelector(".time-hours");
const gameMinutes = document.querySelector(".time-minutes");
const gameSeconds = document.querySelector(".time-seconds");


// init game constants
const game = new GameModel();

// canvas for main board
const cxt = canvas.getContext("2d");

//canvas for naxt shape and holding shape
const cxtNextShape = canvasNextShapeBoard.getContext("2d");
const cxtHoldShape = canvasHoldShapeBoard.getContext("2d");


const board = new Board();
let timerId = null;
let gameIsRunning = false;
let currentLevel = game.level;
let nextShape = null;
let holdShape = null;
let isHolding = false;
let counterId = null;
let musicIsRunning = true;
let gameTimeId = null;

//init audio
const music = new Audio("src/korobeiniki.mp3");
music.loop = true;

const playMusic = () => {
    music.play();
    musicIsRunning = true;
}
const pauseMusic = () => {
    music.pause();
    musicIsRunning = false;
}

audioButton.addEventListener("click", () => {

  if (audioButton.classList.contains("active")) {
    audioButton.classList.remove("active");
  } else {
    audioButton.classList.add("active");
  }

  if(musicIsRunning) {
    pauseMusic();
  } else {
    playMusic();
  }
})

const createCanvas = (cxt, width, height) => {
  cxt.canvas.width = width * BLOCK_SIZE;
  cxt.canvas.height = height * BLOCK_SIZE;
  cxt.scale(BLOCK_SIZE, BLOCK_SIZE);
}

const fillCanvas = (cxt, width, height) => {
  cxt.fillStyle = "#ffffff";
  cxt.fillRect(0, 0, width, height);
}

// create canvas for main board
createCanvas(cxt, COLS, ROWS);
fillCanvas(cxt, 30, 60);

//create canvas for the next shape
createCanvas(cxtNextShape, 4, 4);
fillCanvas(cxtNextShape, 4, 4);

//create canvas for holding shape
createCanvas(cxtHoldShape, 4, 4);
fillCanvas(cxtHoldShape, 4, 4);

const clearCanvas = (cxt) => {
  cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
}

//create new shape on board
const createNewShape = () => {
  return new Shape();
}

//create next shape
const createNextShape = () => {
  nextShape = new Shape();
  nextShape.cxt = cxtNextShape;
}

// updatedShape is a class Shape (x, y, shape, ...)
const drawUpdatedShape = (updatedShape) => {
  clearCanvas(cxt);
  fillCanvas(cxt, 30, 60);
  board.drawBoard();
  board.piece.move(updatedShape);
  board.piece.draw();
}

const updateNextShape = () => {
  createNextShape();
  clearCanvas(cxtNextShape);
  fillCanvas(cxtNextShape, 4, 4);
  nextShape.drawNext(cxtNextShape);
}

const updateDashboard = () => {
  scoreElement.innerHTML = game.getScore();
  levelElement.innerHTML = game.getLevel();
  linesElement.innerHTML = game.getLines();
}

const initBoardPiece = () => {
  board.piece = nextShape;
  board.piece.cxt = cxt;
}

const setTimer = () => {
  gameTimeId = countTimer(game.timer.seconds, game.timer.minutes, game.timer.hours, gameSeconds, gameMinutes, gameHours, game);
}

const finishGame = () => {
  clearInterval(timerId);
  gameIsRunning = false;
  popupGameOver.classList.remove("hide");
  if(musicIsRunning) {
    pauseMusic();
  }
  return;
}

const winGame = () => {
  clearInterval(timerId);
  gameIsRunning = false;
  popupGameWin.classList.remove("hide");
  if(musicIsRunning) {
    pauseMusic();
  }
  return;
}

const counterUpdate = (seconds) => {
  counterElement.innerHTML = seconds;
}

const pauseGame = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  if(musicIsRunning) {
    pauseMusic();
  }
}
// piece is a class Shape (x, y, shape, ...)
const moveDown = (piece) => {
  piece.y = piece.y + 1;

  if (board.validMove(piece)) {
    drawUpdatedShape(piece);
  } else {
    piece.y = piece.y - 1;

    if (piece.y === 0) {
      //finish the game
      finishGame();
    }

    if (game.level >= 15) {
      winGame();
    }

    board.freeze();
    board.clearLines();
    updateDashboard();
    initBoardPiece();
    board.piece.draw();

    //update and draw next shape
    updateNextShape();

    // if level changed increase the time. Clear interval and start with new time
    if (currentLevel !== game.level) {
      currentLevel = game.level;
      clearInterval(timerId);
      timerId = setInterval(function() {
        moveDown(board.piece);
      }, LEVEL[game.level]);
    }
  }
}

const startGame = () => {
  let shape = createNewShape();
  game.reset();
  updateDashboard();
  gameIsRunning = true;
  playMusic();
  setTimer();

  //init the board
  board.reset();
  clearCanvas(cxt);
  clearCanvas(cxtNextShape);
  clearCanvas(cxtHoldShape);
  fillCanvas(cxt, 30, 60);
  fillCanvas(cxtNextShape, 4, 4);
  fillCanvas(cxtHoldShape, 4, 4);
  board.piece = shape;
  shape.cxt = cxt;
  board.cxt = cxt;
  board.game = game;
  shape.draw();

  //create and draw next shape
  createNextShape();
  nextShape.drawNext(cxtNextShape);

  //animation for moving shapes
  timerId = setInterval(function() {
    moveDown(board.piece);
  }, LEVEL[game.level]);
}

const initGame = () => {
  let seconds = 3;
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  if (gameTimeId) {
    clearInterval(gameTimeId);
    gameTimeId = null;
  }
  counterWrap.classList.add("block");
  counterUpdate(seconds);
  counterId = setInterval(function() {
    if (seconds < 0) {
      clearInterval(counterId);
      counterWrap.classList.remove("block");
      counterWrap.classList.add("hide");
      if (gameIsRunning) {
        playMusic();
        timerId = setInterval(function() {
          moveDown(board.piece);
        }, LEVEL[game.level]);
        setTimer();
      } else {
        startGame();
      }
      return;
    }
    counterUpdate(seconds);
    seconds--;
  }, 1000);
}

//set default value to the dashboard
updateDashboard();

playButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  if(!popupGameOver.classList.contains("hide")) {
    popupGameOver.classList.add("hide");
  }
  if(!popupGameWin.classList.contains("hide")) {
    popupGameWin.classList.add("hide");
  }
  initGame();
});

restartButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  gameIsRunning = false;
  initGame();
});

pauseButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  pauseGame();

});

const getNewStateOfShape = (keyCode, piece, board) => {
  if (keyCode === KEY.LEFT || keyCode === KEY.PAD_4) {

      return ({...piece, x: piece.x - 1});

  } else if (keyCode === KEY.RIGHT || keyCode === KEY.PAD_6) {

      return ({...piece, x: piece.x + 1});

  } else if (keyCode === KEY.DOWN) {

      return ({...piece, y: piece.y + 1});

  } else if (keyCode === KEY.SPACE || keyCode === KEY.PAD_2) {

      return ({...piece, y: piece.y + 1});

  } else if (keyCode === KEY.UP || keyCode === KEY.X || keyCode === KEY.PAD_8 || keyCode === KEY.PAD_1 || keyCode === KEY.PAD_5 || keyCode === KEY.PAD_9) {
      let rotatedPiece = rotateShapeClockwise(piece.shape);
      let updatedShape = {...piece, shape: rotatedPiece};

      if (board.validMove(updatedShape)) {
        return ({...piece, shape: rotatedPiece});
      } else {
        return ({...piece, shape: rotateShapeCounterClockwise(piece.shape)})
      }

  } else if (keyCode === KEY.Z || keyCode === KEY.PAD_7 || keyCode === KEY.PAD_3) {
      let rotatedPiece = rotateShapeCounterClockwise(piece.shape);
      let updatedShape = {...piece, shape: rotatedPiece};

      if (board.validMove(updatedShape)) {
        return ({...piece, shape: rotatedPiece});
      } else {
        return ({...piece, shape: rotateShapeClockwise(piece.shape)})
      }

  }

  return piece;
}

//logic for movining shape with keyboard
document.addEventListener("keydown", (evt) => {
  let key = evt.keyCode;
  evt.preventDefault();

  if (key === KEY.ESC || key === 112) {
    pauseGame();
  } else {
    //update x and y position of shape depends on pressed key
    let updatedShape = getNewStateOfShape(key, board.piece, board);

    if (board.validMove(updatedShape)) {
      if (key === KEY.SPACE) {

        while (board.validMove(updatedShape)) {
          drawUpdatedShape(updatedShape);
          updatedShape = getNewStateOfShape(key, board.piece);
          //add points to score and update html elements
          game.setScore(POINTS.HARD_DROP);
        }

        updateDashboard();

      } else if (evt.shiftKey && key === KEY.C || key === KEY.PAD_0) {

        if (isHolding === false) {
          holdShape = board.piece;
          initBoardPiece();
          updateNextShape();
          holdShape.drawNext(cxtHoldShape);
          isHolding = true;
        } else {
          board.piece = holdShape;
          clearCanvas(cxtHoldShape);
          fillCanvas(cxtHoldShape, 4, 4);
          isHolding = false;
        }

      } else if (key === KEY.DOWN || key === KEY.PAD_2) {

        game.setScore(POINTS.SOFT_DROP);
        updateDashboard();
        drawUpdatedShape(updatedShape);

      } else {
        drawUpdatedShape(updatedShape);
      }
    }
  }
})
