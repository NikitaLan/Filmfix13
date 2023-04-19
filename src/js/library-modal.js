'use strict';

import { handleModalOpenClose } from './movie-modal/handle-modal-close';
import { fetchPictures } from './movie-modal/fetch-from-API';
import { handleApiData } from './movie-modal/handle-API-data';
import { PAGE_OPEN, renderList } from './whatched-list';
import {handleApiTrailerData} from './trailer';

import {
  createArrayLocalStorage,
  loadFromLocalStorage,
  removeLocalStorage,
  saveToLocalStorage,
  renameBtn,
  renameBtnTextCont,
} from './watched-queue-btns/fun-watched-queue'; // 💙💛 Koshyk Kostiantyn
const trailerBtn = document.querySelector('.modal-movie__trailer-btn');

const refs = {
  libraryListOfWatched: document.querySelector('.gallery-library__list'), //<ul> з переглянутими фільмами
  movieModalContainer: document.querySelector('.modal-movie'), // модалка
  movieModalCommandBtns: document.querySelectorAll(
    '.modal-movie__command-btns'
  ), // командні кнопки
  btnAddToWatched: document.querySelector('.modal-movie__add-to-watched-btn'), // 💙💛 Koshyk Kostiantyn
  btnQueue: document.querySelector('.modal-movie__add-to-queue-btn'), // 💙💛 Koshyk Kostiantyn
};

refs.libraryListOfWatched.addEventListener('click', handleTrandingMoviesClick); //<ul> з переглянутими фільмами

removeLocalStorage('watched'); // 💙💛 Koshyk Kostiantyn
removeLocalStorage('queue'); // 💙💛 Koshyk Kostiantyn

//-----------------Основна функція------------------------------------

async function handleTrandingMoviesClick(event) {
  // в результаті кліку на будь-яку картку фільму:
  let pickedMovieId = event.target.dataset.id;

  createArrayLocalStorage('watched'); // 💙💛 Koshyk Kostiantyn
  createArrayLocalStorage('queue'); // 💙💛 Koshyk Kostiantyn

  renameBtn(
    refs.btnAddToWatched,
    'watched',
    'Add to watched',
    'Remove from watched',
    pickedMovieId,
    'active-btn--yellow'
  ); // 💙💛 Koshyk Kostiantyn
  renameBtn(
    refs.btnQueue,
    'queue',
    'Add to queue',
    'Remove from queue',
    pickedMovieId,
    'active-btn--yellow'
  ); // 💙💛 Koshyk Kostiantyn

  // 💙💛 Koshyk Kostiantyn (для использования в add-to-watched.js)
  dataModalFilm = fetchPictures(pickedMovieId);

  if (
    event.target.nodeName !== 'IMG' &&
    event.target.nodeName !== 'P' &&
    event.target.nodeName !== 'H2' &&
    event.target.nodeName !== 'H3' &&
    event.target.nodeName !== 'B'
  ) {
    return;
  }

  handleModalOpenClose();
  refs.movieModalContainer.classList.add('modal-movie--background-yellow');
  //   modal-movie--background-red

  handleApiData(pickedMovieId, 'modal-movie__meta-data--yellow');

  refs.movieModalCommandBtns.forEach(movieModalCommandBtn => {
    movieModalCommandBtn.classList.add('modal-movie__command-btns--yellow');
  });

  document.body.style.overflow = 'hidden'; //щоб body не скролився при відкритій модалці
  trailerBtn.addEventListener('click', click)
  function click() {

    handleApiTrailerData(pickedMovieId)
    trailerBtn.removeEventListener('click', click)
  }
}

// ========================= функционал для кнопок "Add to watcheed" и "Add to queue" 💙💛 Koshyk Kostiantyn

let dataModalFilm = {}; // для использования в add-to-watched.js

const btnAddToWatchedEl = document.querySelector(
  '.modal-movie__add-to-watched-btn'
);
const btnQueue = document.querySelector('.modal-movie__add-to-queue-btn');

btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);
btnQueue.addEventListener('click', onQueue);

function onAddFilmToWatched() {
  dataModalFilm.then(data => {
    let getLocalStorage = loadFromLocalStorage('watched');

    if (!getLocalStorage.find(el => el.id === data.id)) {
      getLocalStorage.push(data);
      saveToLocalStorage('watched', getLocalStorage);

      renameBtnTextCont(btnAddToWatchedEl, 'Remove from watched');
      btnAddToWatchedEl.classList.add('active-btn--yellow');

      if (PAGE_OPEN === 1) {
        renderList(getLocalStorage);
      }
    } else {
      const index = getLocalStorage.findIndex(el => el.id === data.id);

      getLocalStorage.splice(index, 1);
      localStorage.setItem('watched', JSON.stringify(getLocalStorage));

      renameBtnTextCont(btnAddToWatchedEl, 'Add to watched');
      btnAddToWatchedEl.classList.remove('active-btn--yellow');
      if (PAGE_OPEN === 1) {
        renderList(getLocalStorage);
      }
    }
  });
}

function onQueue() {
  dataModalFilm.then(data => {
    let getLocalStorage = loadFromLocalStorage('queue');

    if (!getLocalStorage.find(el => el.id === data.id)) {
      getLocalStorage.push(data);
      saveToLocalStorage('queue', getLocalStorage);

      renameBtnTextCont(btnQueue, 'Remove from queue');

      btnQueue.classList.add('active-btn--yellow');
      if (PAGE_OPEN === 2) {
        renderList(getLocalStorage);
      }
    } else {
      const index = getLocalStorage.findIndex(el => el.id === data.id);

      getLocalStorage.splice(index, 1);
      localStorage.setItem('queue', JSON.stringify(getLocalStorage));

      renameBtnTextCont(btnQueue, 'Add to queue');
      btnQueue.classList.remove('active-btn--yellow');
      if (PAGE_OPEN === 2) {
        renderList(getLocalStorage);
      }
    }
  });
}
