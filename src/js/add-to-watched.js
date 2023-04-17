// console.log('💙💛 Koshyk Kostiantyn');

import { dataModalFilm } from '/src/js/movie-modal';

const btnAddToWatchedEl = document.querySelector(
  '.modal-movie__add-to-watched-btn'
);

btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);

function onAddFilmToWatched() {
  dataModalFilm.then(data => {
    let getLocalStorage = loadFromLocalStorage('watched');

    if (!getLocalStorage.includes(data.id)) {
      getLocalStorage.push(data.id);
      saveToLocalStorage('watched', getLocalStorage);

      renameBtn('Remove from watched');
    } else {
      const index = getLocalStorage.findIndex(el => el === data.id);

      getLocalStorage.splice(index, 1);
      localStorage.setItem('watched', JSON.stringify(getLocalStorage));

      renameBtn('Add to watched');
    }
  });
}

// функция добавляяет в Local Storage
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error.message);
  }
}

// функция читает из Local Storage
export function loadFromLocalStorage(key) {
  try {
    return null ? undefined : JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Hi', error.message);
  }
}

// функция переименовывает кнопку
export function renameBtn(nameBtn) {
  btnAddToWatchedEl.textContent = nameBtn;
}

// содает пустой массив в Local Storage, если такой отсутствует
export function createArrayLocalStorage() {
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', '[]');
  }
}
