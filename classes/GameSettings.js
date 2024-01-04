class GameSettings {
  constructor() {
    this.numRows = 0;
    this.numCols = 0;
    this.limitAttempts = false;
    this.numAttempts = -1;
    this.memorizationTime = 1500;
  }

  setDimensions({ numRows, numCols }) {
    this.numRows = numRows || this.numRows;
    this.numCols = numCols || this.numCols;
    localStorage.setItem("numRows", this.numRows);
    localStorage.setItem("numCols", this.numCols);
  }

  reset() {
    this.limitAttempts = false;
    this.numAttempts = -1;
    this.memorizationTime = 1500;
  }

  getDimensions() {
    return {
      numRows: this.numRows,
      numCols: this.numCols,
      numEmojis: this.getNumEmojis(),
    };
  }

  getNumEmojis() {
    return this.numRows * this.numCols * 0.5;
  }

  invalidDimensions() {
    return this.numRows % 2 != 0 && this.numCols % 2 != 0;
  }

  setOptions({ difficulty, limitAttempts, numAttempts, memorizationTime }) {
    this.difficulty = difficulty || this.difficulty;
    this.limitAttempts = limitAttempts != null ? limitAttempts : this.limitAttempts;
    this.numAttempts = numAttempts || this.numAttempts;
    this.memorizationTime = memorizationTime || this.memorizationTime;
    localStorage.setItem("limitAttempts", this.limitAttempts);
    localStorage.setItem("numAttempts", this.numAttempts);
    localStorage.setItem("memorizationTime", this.memorizationTime);
  }

  getOptions() {
    return {
      difficulty: this.difficulty,
      limitAttempts: this.limitAttempts,
      numAttempts: this.numAttempts,
      memorizationTime: this.memorizationTime,
    };
  }

  getDifficulty() {
    return this.difficulty;
  }

  limitedAttempts() {
    return this.limitAttempts;
  }

  getNumAttempts() {
    return this.numAttempts;
  }

  getMemorizationTime() {
    return this.memorizationTime;
  }
}

export default GameSettings;
