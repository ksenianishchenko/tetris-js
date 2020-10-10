import {COLORS, SHAPES} from "./data.js";
import {getRandomId} from "./helpers.js";

class Shape {
  constructor() {
    this.cxt = null;
    this.shapeId = getRandomId();
    this.color = COLORS[this.shapeId];
    this.shape = SHAPES[this.shapeId];
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.cxt.fillStyle = this.color;

    this.shape.forEach((row, y) => {
      row.forEach((val, x) => {

        if (val > 0) {
          this.cxt.fillRect(this.x + x, this.y + y, 1, 1);
        }
      })
    })
  }

  move(piece) {
    this.x = piece.x;
    this.y = piece.y;
  }

  drawNext(canvas) {
    this.shapeId = getRandomId();
    canvas.fillStyle = this.color;

    this.shape.forEach((row, y) => {
      row.forEach((val, x) => {

        if (val > 0) {
          canvas.fillRect(x, y, 1, 1);
        }
      })
    })
  }
}

export default Shape;
