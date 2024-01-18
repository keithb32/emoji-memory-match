class Card {
  constructor(id, back) {
    this.id = id;
    this.front = "❔";
    this.back = back;
  }

  toHtml() {
    return `
    <td class="flipcard-container text-[2rem] p-[2rem] border border-[#888] hover:cursor-pointer">
        <div id=${this.id} class="flipcard">
            <div id=front-${this.id} class="card-face card-front">${this.front}</div>
            <div id=back-${this.id} class="card-face card-back">${this.back}</div>
        </div>
    </td>
    `;
  }

  reveal() {
    $(`#${this.id}`).toggleClass("revealed");
    $(`#${this.id}`).addClass("pointer-events-none");
  }

  hide() {
    $(`#${this.id}`).toggleClass("revealed");
    $(`#${this.id}`).removeClass("pointer-events-none");
  }

  disable() {
    $(`#${this.id}`).addClass("pointer-events-none");
  }

  isRevealed() {
    return $(`#${this.id}`).hasClass("revealed");
  }

  matches(other) {
    return this.back == other.back;
  }
}

export default Card;
