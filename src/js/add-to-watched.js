// // 💙💛 Koshyk Kostiantyn

// import { ThemoviedbAPI } from '/src/js/themoviedb-api';

// const btnAddToWatchedEl = document.querySelector('.btn-watched');
// const btnRemoveEl = document.querySelector('.js-remove');

// btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);

// const apiTest = new ThemoviedbAPI();

// let addLocalStorage = [];

// function onAddFilmToWatched() {
//   apiTest.fetchMovie().then(data => {
//     addLocalStorage.push(data.results[1]);
//     localStorage.setItem('watched', JSON.stringify(addLocalStorage));
//     // localStorage.setItem('watched', JSON.stringify(addLocalStorage));

//     // valuesLocalStor.push(data.results[0]);
//     // addToLocalStorage();

//     // getLocal = JSON.parse(localStorage.getItem('watched'));

//     btnAddToWatchedEl.textContent = 'Remove from watchet';
//     btnAddToWatchedEl.classList.toggle('.js-remove');

//     // console.log('val', valuesLocalStor);
//   });
// }

// // const btnAddToWatchedEl = document.querySelector('.btn-watched');
// // const btnRemoveEl = document.querySelector('.js-remove');

// // btnAddToWatchedEl.addEventListener('click', onAddFilmToWatched);

// // const apiTest = new ThemoviedbAPI();

// // let valuesLocalStor = [];
// // let getLocal = null;

// // function onAddFilmToWatched(evt) {
// //   apiTest.fetchMovie().then(data => {
// //     localStorage.setItem('watched', JSON.stringify(data.results[0]));
// //     valuesLocalStor.push(data.results[0]);
// //     // addToLocalStorage();

// //     // getLocal = JSON.parse(localStorage.getItem('watched'));

// //     btnAddToWatchedEl.textContent = 'Remove from watchet';
// //     btnAddToWatchedEl.classList.toggle('.js-remove');

// //     console.log('val', valuesLocalStor);
// //   });
// // }

// // function onAddFilmToWatched(evt) {
// //   apiTest.fetchMovie().then(data => {
// //     addToLocalStorage();

// //     valuesLocalStor = JSON.parse(localStorage.getItem('watched'));

// //     valuesLocalStor.push(data.results[0]);

// //     btnAddToWatchedEl.textContent = 'Remove from watchet';
// //     btnAddToWatchedEl.classList.toggle('.js-remove');

// //     console.log('val', valuesLocalStor);
// //   });
// // }

// function addToLocalStorage() {
//   localStorage.setItem('watched', JSON.stringify(valuesLocalStor));
// }

// function onRemove() {}
