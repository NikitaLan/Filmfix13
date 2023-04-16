// console.log('💙💛 Koshyk Kostiantyn');

// получаем объект с свойствами данных фильма из модального окна
import { dataModalFilm } from '/src/js/movie-modal';

const btnAddToWatchedEl = document.querySelector(
  '.modal-movie__add-to-watched-btn'
);

btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);

function onAddFilmToWatched() {
  dataModalFilm.then(data => {
    console.log('then', data);

    if (localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', '[]');
    }

    addToLocalStorage(data);
  });
}

function addToLocalStorage(data) {
  let getLocalStorage = JSON.parse(localStorage.getItem('watched'));

  if (!getLocalStorage.find(el => el.id === data.id)) {
    getLocalStorage.push(data);
    localStorage.setItem('watched', JSON.stringify(getLocalStorage));
    btnAddToWatchedEl.textContent = 'Remove from watched';
  } else {
    btnAddToWatchedEl.textContent = 'Add to watched';

    const index = getLocalStorage.findIndex(el => el.id === data.id);

    getLocalStorage.splice(index, 1);
    localStorage.setItem('watched', JSON.stringify(getLocalStorage));
  }
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
