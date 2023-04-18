'use strict';

import {handleModalOpenClose} from './movie-modal/handle-modal-close';
import {fetchPictures} from './movie-modal/fetch-from-API';
import {handleApiData} from './movie-modal/handle-API-data';

// import {    //- при импорте ошибка (так как library.js и index.js не связанньі)
//   createArrayLocalStorage,
//   loadFromLocalStorage,
//   removeLocalStorage,
// } from '/src/js/add-to-watched'; // 💙💛 Koshyk Kostiantyn


const refs = {
  libraryListOfWatched: document.querySelector('.gallery-library__list'), //<ul> з переглянутими фільмами
  btnAddToWatched: document.querySelector('.modal-movie__add-to-watched-btn'), // 💙💛 Koshyk Kostiantyn
  btnQueue: document.querySelector('.modal-movie__add-to-queue-btn'), // 💙💛 Koshyk Kostiantyn
};


// removeLocalStorage('watched'); // 💙💛 Koshyk Kostiantyn
// removeLocalStorage('queue'); // 💙💛 Koshyk Kostiantyn

refs.libraryListOfWatched.addEventListener('click', handleWatchedMoviesClick); //<ul> з переглянутими фільмами

async function handleWatchedMoviesClick(event) { // в результаті кліку на будь-яку картку фільму:
  let pickedMovieId = event.target.dataset.id;

//   createArrayLocalStorage('watched'); // 💙💛 Koshyk Kostiantyn
//   createArrayLocalStorage('queue'); // 💙💛 Koshyk Kostiantyn

//   renameBtn(
//     refs.btnAddToWatched,
//     'watched',
//     'Add to watched',
//     'Remove from watched',
//     pickedMovieId
//   ); // 💙💛 Koshyk Kostiantyn

//   renameBtn(
//     refs.btnQueue,
//     'queue',
//     'Add to queue',
//     'Remove from queue',
//     pickedMovieId
//   ); // 💙💛 Koshyk Kostiantyn

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
  handleApiData(pickedMovieId);

  document.body.style.overflow = 'hidden'; //щоб body не скролився при відкритій модалці
}

let dataModalFilm = {}; // для использования в add-to-watched.js



// // 💙💛 Koshyk Kostiantyn функция изменяет название кнопки
// function renameBtn(btn, key, nameA, nameB, id) {
//     if (!loadFromLocalStorage(key).includes(Number(id))) {
//       btn.textContent = nameA;
//       btn.classList.remove('active-btn');
//     } else {
//       btn.textContent = nameB;
//       btn.classList.add('active-btn');
//     }
//   }
  
  // 💙💛 Koshyk Kostiantyn (для использования в add-to-watched.js)
  export { dataModalFilm, refs };

  