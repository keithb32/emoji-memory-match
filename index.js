import { game, clearGame, showGame, clearStart, showStart } from "./modules/game.js";
import GameState from "./classes/GameState.js";
import GameSettings from "./classes/GameSettings.js";

var state = new GameState();
var settings = new GameSettings();

$(document).ready(() => {
  let numRows = JSON.parse(localStorage.getItem("numRows")) || 4;
  let numCols = JSON.parse(localStorage.getItem("numCols")) || 4;
  let limitAttempts = JSON.parse(localStorage.getItem("limitAttempts")) || false;
  let numAttempts = JSON.parse(localStorage.getItem("numAttempts")) || -1;
  let memorizationTime = JSON.parse(localStorage.getItem("memorizationTime")) || 1500;

  $("#numRows").val(numRows);
  $("#numCols").val(numCols);

  if (limitAttempts) {
    $("#enableLimitedAttempts").prop("checked", true);
    $("#numAttempts").val(numAttempts || 10);
  } else {
    $("#disableLimitedAttempts").prop("checked", true);
    $("#numAttempts").val("").prop("disabled", true);
  }

  $("#memorizationTime").val(memorizationTime);

  settings.setDimensions({ numRows, numCols });
  settings.setOptions({ limitAttempts, numAttempts, memorizationTime });
});

$("#numRows").on("change", ({ currentTarget }) => {
  let numRows = parseInt($(currentTarget).val());
  if (numRows < 1) {
    numRows = 1;
    $(currentTarget).val(1);
  }
  settings.setDimensions({ numRows });
});

$("#numCols").on("change", ({ currentTarget }) => {
  let numCols = parseInt($(currentTarget).val());
  if (numCols < 1) {
    numCols = 1;
    $(currentTarget).val(1);
  }
  settings.setDimensions({ numCols });
});

$("#cogIcon, #closeSettingsIcon").on("click", () => {
  $("#settingsModal").toggleClass("hidden");
});

$("input[name='limitedAttempts']").on("change", () => {
  let enabled = JSON.parse($("input[name='limitedAttempts']:checked").val());
  if (enabled) {
    $("#numAttempts").prop("disabled", false);
    $("#numAttempts").val(10);
    settings.setOptions({ limitAttempts: true, numAttempts: 10 });
  } else {
    $("#numAttempts").prop("disabled", true);
    $("#numAttempts").val("");
    settings.setOptions({ limitAttempts: false, numAttempts: -1 });
  }
});

$("#numAttempts").on("change", ({ currentTarget }) => {
  let numAttempts = parseInt($(currentTarget).val());
  if (numAttempts < 1) {
    numAttempts = 1;
    $(currentTarget).val(1);
  }
  settings.setOptions({ numAttempts });
});

$("#memorizationTime").on("change", ({ currentTarget }) => {
  let memorizationTime = parseInt($(currentTarget).val());
  if (memorizationTime < 1000) {
    memorizationTime = 1000;
    $(currentTarget).val(1000);
  }
  settings.setOptions({ memorizationTime });
});

$("#resetSettingsBtn").on("click", (event) => {
  event.preventDefault();
  $("#normalDifficulty").prop("checked", true);
  $("#disableLimitedAttempts").prop("checked", true);
  $("#numAttempts").val("").prop("disabled", true);
  $("#memorizationTime").val(1500);
  settings.reset();
});

$("#saveSettingsBtn").on("click", (event) => {
  event.preventDefault();
  $("#settingsModal").toggleClass("hidden");
});

$("#backToStartBtn").on("click", () => {
  let confirmed = confirm("Are you sure you want to go back? All current game progress will be lost.");
  if (confirmed) {
    state.reset();
    clearGame();
    showStart();
  }
});

$("#backToStartBtnMobile").on("click", () => {
  let confirmed = confirm("Are you sure you want to go back? All current game progress will be lost.");
  if (confirmed) {
    state.reset();
    clearGame();
    showStart();
    $("#gameScreen").removeClass("overflow-hidden");
    $("#curtainMenu").toggleClass("hidden");
  }
});

$("#newGameBtn").on("click", () => {
  let confirmed = confirm("Are you sure you want to start a new game? All current game progress will be lost.");
  if (confirmed) {
    state.reset();
    clearGame();
    showGame();
    game(state, settings);
  }
});

$("#newGameBtnMobile").on("click", () => {
  let confirmed = confirm("Are you sure you want to start a new game? All current game progress will be lost.");
  if (confirmed) {
    state.reset();
    clearGame();
    showGame();
    game(state, settings);
    $("#gameScreen").removeClass("overflow-hidden");
    $("#curtainMenu").toggleClass("hidden");
  }
});

$("#mobileGameNavBtn").on("click", () => {
  $("#gameScreen").addClass("overflow-hidden");
  $("#curtainMenu").toggleClass("hidden");
});

$("#closeCurtainMenuIcon").on("click", () => {
  $("#gameScreen").removeClass("overflow-hidden");
  $("#curtainMenu").toggleClass("hidden");
});

$("#startForm").on("submit", (event) => {
  event.preventDefault();
  if (game(state, settings)) {
    clearStart();
  }
});

$("#zoomOutBtn").on("click", () => {
  state.zoomOut();
  $("#board").css({
    transform: "scale(" + state.getZoom() + ")",
    transformOrigin: "50% 0",
  });
});

$("#zoomInBtn").on("click", () => {
  state.zoomIn();
  $("#board").css({
    transform: "scale(" + state.getZoom() + ")",
    transformOrigin: "50% 0",
  });
});

$("#resetZoomBtn").on("click", () => {
  state.resetZoom();
  $("#board").css({
    transform: "scale(" + state.getZoom() + ")",
    transformOrigin: "50% 0",
  });
});
