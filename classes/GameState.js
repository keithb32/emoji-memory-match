class GameState {
  constructor() {
    this.numGuesses = 0;
    this.numWrongGuesses = 0;
    this.cardsById = {};
    this.revealed = [];
    this.matched = [];
  }

  reset() {
    this.numGuesses = 0;
    this.numWrongGuesses = 0;
    this.cardsById = {};
    this.revealed = [];
    this.matched = [];
  }

  addCard(card) {
    this.cardsById[card.id] = card;
  }

  getCard(id) {
    return this.cardsById[id];
  }

  getCards() {
    return Object.values(this.cardsById);
  }

  reveal(card) {
    this.revealed.push(card);

    if (this.revealed.length == 2) {
      this.numGuesses++;
    }
  }

  turnFinished() {
    return this.revealed.length == 2;
  }

  match() {
    let card1 = this.revealed[0];
    let card2 = this.revealed[1];

    if (card1.matches(card2) && !this.matched.includes(this.revealed)) {
      this.matched.push(this.revealed);
    } else {
      this.numWrongGuesses++;
    }

    return card1.matches(card2);
  }

  gameWon(settings) {
    return this.matched.length == settings.getNumEmojis();
  }

  gameLost(settings) {
    return settings.limitedAttempts() && this.getNumWrongGuesses() > settings.getNumAttempts();
  }

  getNumGuesses() {
    return this.numGuesses;
  }

  getNumWrongGuesses() {
    return this.numWrongGuesses;
  }

  getRevealed() {
    return this.revealed;
  }

  clearRevealed() {
    this.revealed = [];
  }

  getMatched() {
    return this.matched;
  }
}

export default GameState;
