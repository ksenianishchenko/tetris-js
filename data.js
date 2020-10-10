let windowWidth = screen.width;

let BLOCK_SIZE = null;

if (windowWidth < 600) {
  BLOCK_SIZE = 15;
} else {
  BLOCK_SIZE = 30;
}

const ROWS = 20;
const COLS = 10;

const KEY = {
  "LEFT": 37,
  "RIGHT": 39,
  "DOWN": 40,
  "UP": 38,
  "SPACE": 32,
  "X": 88,
  "CTRL": 17,
  "Z": 90,
  "SHIFT": 16,
  "C": 67,
  "ESC": 27,
  "PAD_0": 96,
  "PAD_8": 104,
  "PAD_4": 100,
  "PAD_6": 102,
  "PAD_2": 98,
  "PAD_1": 97,
  "PAD_5": 101,
  "PAD_9": 105,
  "PAD_3": 99,
  "PAD_7": 103,
}

const COLORS = [
  "cyan",
  "yellow",
  "purple",
  "green",
  "red",
  "blue",
  "orange"
]

const SHAPES = [
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0]
  ],
  [
    [2, 2, 0],
    [2, 2, 0],
    [0, 0, 0]
  ],
  [
    [3, 3, 3],
    [0, 3, 0],
    [0, 0, 0]
  ],
  [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0]
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 6],
    [0, 0, 6],
    [0, 6, 6]
  ],
  [
    [7, 0, 0],
    [7, 0, 0],
    [7, 7, 0]
  ]
]

Object.freeze(KEY);

const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70
}


export {ROWS, COLS, BLOCK_SIZE, KEY, COLORS, SHAPES, POINTS, LEVEL};
