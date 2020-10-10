class GameModel {
  constructor() {
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.timer = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  reset() {
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.time = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  getScore() {
    return this.score;
  }

  getLevel() {
    return this.level;
  }

  getLines() {
    return this.lines;
  }

  setScore(val) {
    this.score = this.score + val;
  }

  setLines(val) {
    this.lines = this.lines + val;
  }

  setLevel() {
    if (this.lines >= 10) {
      this.level = this.level + 1;
      this.lines = 0;
    }
  }
}

export default GameModel;
