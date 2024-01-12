import { sleep, randomEmojis, fadeReveal, fadeHide } from "./utils.js";
import Card from "../classes/Card.js";

function clearStart() {
  $("#startScreen").addClass("hidden");
}

function showStart() {
  $("#startScreen").removeClass("hidden");
}

function clearGame() {
  $("#board").empty();
  $("#winContainer").addClass("hidden");
  $("#lossContainer").addClass("hidden");
  fadeHide($("#gameContainer"));
  fadeHide($("#resultsContainer"));
  fadeHide($("#gameScreen"));
}

function showGame() {
  fadeReveal($("#gameContainer"));
  fadeReveal($("#gameScreen"));
}

function createBoard(state, settings) {
  let { numRows, numCols, numEmojis } = settings.getDimensions();
  let emojis = randomEmojis(numEmojis);
  for (let i = 0; i < numRows; i++) {
    let row = $("<tr>");
    for (let j = 0; j < numCols; j++) {
      let idx = i * numCols + j;
      let back = emojis[idx];

      let card = new Card(idx, back);
      state.addCard(card);

      row.append(card.toHtml());
    }
    $("#board").append(row);
  }
}

function disableBoard() {
  $(".flipcard").addClass("pointer-events-none");
}

function revealBoard(state) {
  state.getCards().forEach((card) => !card.isRevealed() && card.reveal());
}

function hideRevealedCards(state) {
  state.getRevealed().forEach((card) => card.hide());
}

function enableRemainingCards(state) {
  let matchedCardIds = state
    .getMatched()
    .flat()
    .map((card) => card.id);
  let matchedCardsSelector = matchedCardIds.map((id) => "#" + id).join(",");
  $(`.flipcard:not(${matchedCardsSelector})`).removeClass("pointer-events-none");
}

function showWin() {
  $("#gameContainer").removeClass("fade-in").addClass("fade-out");
  $("#lossContainer").addClass("hidden");
  sleep(1500).then(() => {
    $("#gameContainer").addClass("hidden");
    fadeReveal($("#winContainer"));
    fadeReveal($("#resultsContainer")).addClass("flex flex-col justify-center items-center");
  });
}

function showLoss() {
  $("#gameContainer").removeClass("fade-in").addClass("fade-out");
  $("#winContainer").addClass("hidden");
  sleep(1500).then(() => {
    $("#gameContainer").addClass("hidden");
    fadeReveal($("#lossContainer"));
    fadeReveal($("#resultsContainer")).addClass("flex flex-col justify-center items-center");
  });
}

function createStats(settings) {
  $("#remainingTries").text(settings.getNumAttempts());
  if (settings.limitedAttempts()) {
    $("#remainingTriesContainer").removeClass("invisible");
  } else {
    $("#remainingTriesContainer").addClass("invisible");
  }
}

function updateStats(state, settings) {
  if (settings.limitedAttempts()) {
    let remaining = Math.max(0, settings.getNumAttempts() - state.getNumWrongGuesses());
    $("#remainingTries").text(remaining);
  }
}

function game(state, settings) {
  if (settings.invalidDimensions()) {
    alert("Atleast one of the dimensions must be even.");
    return false;
  }

  createStats(settings);
  createBoard(state, settings);

  // Emoji card click handler
  $(".flipcard").on("click", ({ currentTarget }) => {
    let card = state.getCard(currentTarget.id);
    card.reveal();
    state.reveal(card);

    if (state.turnFinished()) {
      disableBoard();
      if (state.match()) {
        state.clearRevealed();
        enableRemainingCards(state);
      } else {
        sleep(settings.getMemorizationTime())
          .then(() => hideRevealedCards(state))
          .then(() => state.clearRevealed())
          .then(() => enableRemainingCards(state));
      }
    }

    updateStats(state, settings);

    if (state.gameWon(settings)) {
      showWin();
    }

    if (state.gameLost(settings)) {
      sleep(settings.getMemorizationTime())
        .then(() => revealBoard(state))
        .then(() => showLoss());
    }
  });

  showGame();

  return true;
}

export { game, clearStart, showStart, clearGame, showGame };
