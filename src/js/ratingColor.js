export default function makeRatingColor() {
  const span = document.querySelectorAll('.gallery-home__card-rate');
  const spanArray = Array.from(span);
  spanArray.map(el => {
    if (Number(el.textContent) < 4) {
      el.style.backgroundColor = '#B92F2C';
    } else if (Number(el.textContent) >= 6.5) {
      el.style.backgroundColor = '#008000';
    } else {
      el.style.backgroundColor = '#ff8c00';
    }
  });
}
