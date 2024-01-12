const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const emojiUnicodeRanges = [
  [0x1f600, 0x1f64f],
  [0x1f300, 0x1f5ff],
  [0x1f680, 0x1f6ff],
  [0x2600, 0x26ff],
];

// Source: https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
const isEmojiSupported = (index) => {
  let e = String.fromCodePoint(index);
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText(e, -4, 4);
  return ctx.getImageData(0, 0, 1, 1).data[3] > 0; // Not a transparent pixel
};

const EMOJIS = emojiUnicodeRanges
  .map(([lower, upper]) => Array.from({ length: upper - lower + 1 }, (_, i) => String.fromCodePoint(lower + i)))
  .flat();

function randomEmojis(numEmojis) {
  const randomIndices = [];

  while (randomIndices.length < numEmojis * 2) {
    const randomIndex = Math.floor(Math.random() * EMOJIS.length);

    if (!randomIndices.includes(randomIndex) && isEmojiSupported(randomIndex)) {
      // Push index twice since the emoji will appear in the board twice
      randomIndices.push(randomIndex, randomIndex);
    }
  }

  const randomEmojis = randomIndices.map((index) => EMOJIS[index]);
  shuffleArray(randomEmojis);

  return randomEmojis;
}

const fadeReveal = (jq) => {
  return jq.addClass("fade-in").removeClass("fade-out hidden");
};

const fadeHide = (jq) => {
  return jq.removeClass("fade-out").addClass("fade-in hidden");
};

export { sleep, shuffleArray, randomEmojis, fadeReveal, fadeHide };
