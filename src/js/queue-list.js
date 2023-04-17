const refs = {
  queueBtn: document.querySelector('.btn-queue'),
  queueList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};

const STORAGE_KEY = 'queue-list';
let queueList = {};

refs.watchedBtn.addEventListener('click', takeListFromStorage);

function takeListFromStorage() {
  console.log('click on btn Queue');
  const listFromStorage = localStorage.getItem(STORAGE_KEY);
  queueList = JSON.parse(listFromStorage);
  console.log(queueList.results);
  refs.watchedList.insertAdjacentHTML(
    'afterbegin',
    cardMarkup(queueList.results)
  );
  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.classList.remove('visually-hidden');
}
