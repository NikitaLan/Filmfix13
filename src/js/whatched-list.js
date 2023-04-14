const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  watchedList: document.querySelector('.gallery-library__list'),
};

const STORAGE_KEY = 'watched-list';
let watchedList = {};

refs.watchedBtn.addEventListener('click', takeListFromStorage);

function takeListFromStorage() {
  console.log('click on btn Watched');
}
