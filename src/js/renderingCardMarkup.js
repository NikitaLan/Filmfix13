import cardMarkup from './cardMarkup.hbs';

export function renderTrendGallery(filmData) {
  const galleryTrendListEl = document.querySelector('.gallery-home__list');
  galleryTrendListEl.innerHTML = '';
  galleryTrendListEl.insertAdjacentHTML('afterbegin', cardMarkup(filmData));
}
