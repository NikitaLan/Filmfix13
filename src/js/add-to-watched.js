// console.log('💙💛 Koshyk Kostiantyn');

// получаем объект с свойствами данных фильма из модального окна
import { dataModalFilm } from '/src/js/movie-modal';

const btnAddToWatchedEl = document.querySelector(
  '.modal-movie__add-to-watched-btn'
);

btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);

function onAddFilmToWatched() {
  // console.log(dataModalFilm);

  dataModalFilm.then(data => {
    console.log('then', data);

    if (localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', '[]');
    }

    addToLocalStorage(data);

    btnAddToWatchedEl.textContent = 'Remove from watchet';
    btnAddToWatchedEl.classList.toggle('.js-remove');
  });
}

function addToLocalStorage(data) {
  let getLocalStorage = JSON.parse(localStorage.getItem('watched'));

  if (!getLocalStorage.find(el => el.id === data.id)) {
    getLocalStorage.push(data);
    localStorage.setItem('watched', JSON.stringify(getLocalStorage));
  }
  console.log('Data ls', getLocalStorage);
}

// // если использовать id
// function addToLocalStorage(data) {
//   let getLocalStorage = JSON.parse(localStorage.getItem('watched'));

//   if (!getLocalStorage.includes(data)) {
//     getLocalStorage.push(data);
//     localStorage.setItem('watched', JSON.stringify(getLocalStorage));
//   }
//   console.log('Data ls', getLocalStorage);
// }
