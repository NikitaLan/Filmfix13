import cardMarkup from './cardMarkup.hbs';
import makeRatingColor from './ratingColor'

export function renderTrendGallery(filmData) {
  const galleryTrendListEl = document.querySelector('.gallery-home__list');
  galleryTrendListEl.insertAdjacentHTML('afterbegin', cardMarkup(filmData));
  
  makeRatingColor();
}
