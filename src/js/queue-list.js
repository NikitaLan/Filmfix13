const refs = {
  queueBtn: document.querySelector('.btn-queue'),
  queueList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};

const STORAGE_KEY = 'queue-list';
let queueList = {};

// refs.watchedBtn.addEventListener('click', takeListFromStorage);

function takeListFromStorage() {
  const listFromStorage = localStorage.getItem(STORAGE_KEY);
  queueList = JSON.parse(listFromStorage);

  refs.watchedList.insertAdjacentHTML(
    'afterbegin',
    cardMarkup(queueList.results)
  );
  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.classList.remove('visually-hidden');
}
