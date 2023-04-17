import cardMarkup from './cardMarkup.hbs';
import createGenresFromTrend from './createGenres';
import { allGenres } from './allGenresList';
import getGenres from './createGenres';
// import fetchPictures from './movie-modal';

const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  watchedList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
  gallaryLibraryList: document.querySelector('.gallery-library__list'),
  movieModal: document.querySelector('[data-modal]'),
};

const STORAGE_KEY = 'watched';
let watchedList = {};

refs.watchedBtn.addEventListener('click', takeListFromStorage);
refs.gallaryLibraryList.addEventListener('click', onLibraryClick);

function takeListFromStorage() {
  console.log('click on btn Watched');
  const listFromStorage = localStorage.getItem(STORAGE_KEY);
  watchedList = JSON.parse(listFromStorage);
  // const whatcheListGenders = getGenres(allGenres);
  // console.log(getGenres);
  // createGenresFromTrend(watchedList, whatcheListGenders);
  // console.log(createGenresFromTrend);
  // console.log(watchedList[0].genres);
  refs.watchedList.insertAdjacentHTML('afterbegin', cardMarkup(watchedList));
  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.classList.remove('visually-hidden');
}

function onLibraryClick(event) {
  let pickedMovieId = event.target.dataset.id;
  console.log(pickedMovieId);

  fetchPictures(pickedMovieId); // для использования в add-to-watched.js

  if (
    event.target.nodeName !== 'IMG' &&
    event.target.nodeName !== 'P' &&
    event.target.nodeName !== 'H2' &&
    event.target.nodeName !== 'H3' &&
    event.target.nodeName !== 'B'
  ) {
    return;
  }
  refs.movieModal.classList.remove('is-hidden'); //відкриття модалки

  // слухачі з обробниками подій для закриття модалки
  refs.movieModal.addEventListener('click', handleBackdropClick); //модалка для бекдропа
  refs.closeMovieModalBtn.addEventListener(
    'click',
    handleCloseMovieModalBtnClick
  ); //кнопка "Х"
  window.addEventListener('keydown', handleMovieModalKeyPress); //window для Esc

  refs.sectionForRenderIn.innerHTML = '';
}
