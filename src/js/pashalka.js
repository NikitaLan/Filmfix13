const cards = document.querySelectorAll('.memory-card');
const game = document.querySelector('.memory-game');
const modalFooter = document.querySelector('.team__list');

const melnychenko = document.querySelector('.melnychenko');

melnychenko.addEventListener('click', pashalkaOn);

function pashalkaOn() {
  modalFooter.classList.add('visually-hidden');
  game.classList.remove('visually-hidden');
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {


  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  console.log(+isMatch);
  +isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));

