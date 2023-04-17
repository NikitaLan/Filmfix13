const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  watchedList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};

const STORAGE_KEY = 'watched-list';
let watchedList = {};

refs.watchedBtn.addEventListener('click', takeListFromStorage);

function takeListFromStorage() {
  console.log('click on btn Watched');
  const listFromStorage = localStorage.getItem(STORAGE_KEY);
  watchedList = JSON.parse(listFromStorage);
  console.log(watchedList.results);
  refs.watchedList.insertAdjacentHTML(
    'afterbegin',
    cardMarkup(watchedList.results)
  );
  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.classList.remove('visually-hidden');
}
