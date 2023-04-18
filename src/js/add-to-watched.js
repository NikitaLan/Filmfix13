// console.log('💙💛 Koshyk Kostiantyn');

// import { dataModalFilm } from '/src/js/movie-modal';
// import {
//   saveToLocalStorage,
//   loadFromLocalStorage,
//   renameBtn,
// } from '/src/js/watched-queue-btns/fun-watched-queue';

// const btnAddToWatchedEl = document.querySelector(
//   '.modal-movie__add-to-watched-btn'
// );
// const btnQueue = document.querySelector('.modal-movie__add-to-queue-btn');

// btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);
// btnQueue.addEventListener('click', onQueue);

// function onAddFilmToWatched() {
//   dataModalFilm.then(data => {
//     let getLocalStorage = loadFromLocalStorage('watched');

//     if (!getLocalStorage.includes(data.id)) {
//       getLocalStorage.push(data.id);
//       saveToLocalStorage('watched', getLocalStorage);

//       renameBtn(btnAddToWatchedEl, 'Remove from watched');
//       btnAddToWatchedEl.classList.add('active-btn');
//     } else {
//       const index = getLocalStorage.findIndex(el => el === data.id);

//       getLocalStorage.splice(index, 1);
//       localStorage.setItem('watched', JSON.stringify(getLocalStorage));

//       renameBtn(btnAddToWatchedEl, 'Add to watched');
//       btnAddToWatchedEl.classList.remove('active-btn');
//     }
//   });
// }

// function onQueue() {
//   dataModalFilm.then(data => {
//     let getLocalStorage = loadFromLocalStorage('queue');

//     if (!getLocalStorage.includes(data.id)) {
//       getLocalStorage.push(data.id);
//       saveToLocalStorage('queue', getLocalStorage);

//       renameBtn(btnQueue, 'Remove from queue');

//       btnQueue.classList.add('active-btn');
//     } else {
//       const index = getLocalStorage.findIndex(el => el === data.id);

//       getLocalStorage.splice(index, 1);
//       localStorage.setItem('queue', JSON.stringify(getLocalStorage));

//       renameBtn(btnQueue, 'Add to queue');
//       btnQueue.classList.remove('active-btn');
//     }
//   });
// }

// // функция добавляяет в Local Storage
// function saveToLocalStorage(key, value) {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// // функция читает из Local Storage
// export function loadFromLocalStorage(key) {
//   try {
//     return null ? undefined : JSON.parse(localStorage.getItem(key));
//   } catch (error) {
//     console.error('Hi', error.message);
//   }
// }

// // функция переименовывает кнопку
// function renameBtn(btn, nameBtn) {
//   btn.textContent = nameBtn;
// }

// // содает пустой массив в Local Storage, если такой отсутствует
// export function createArrayLocalStorage(key) {
//   if (localStorage.getItem(key) === null) {
//     localStorage.setItem(key, '[]');
//   }
// }
// // Удаляет пустой массив в LocalStorage, если он пуст
// export function removeLocalStorage(key) {
//   if (localStorage.getItem(key) === '[]') {
//     localStorage.removeItem(key);
//   }
// }
