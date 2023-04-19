import { makeLibraryGalleryMarkUp } from '../js/makeGalleryMarkUpCard';
import makeRatingColor from './ratingColor';
import { loadFromLocalStorage } from '/src/js/watched-queue-btns/fun-watched-queue'; // 💙💛 Koshyk Kostiantyn

const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  queueBtn: document.querySelector('.btn-queue'),
  watchedList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};

export let PAGE_OPEN = 1;

refs.watchedBtn.classList.add('active');

refs.watchedBtn.addEventListener('click', () => {
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');
});

refs.queueBtn.addEventListener('click', () => {
  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');
});

window.addEventListener('load', onLibWatchedBtnClick);
refs.watchedBtn.addEventListener('click', onLibWatchedBtnClick);
refs.queueBtn.addEventListener('click', onLibQueueBtnClick);

function onLibWatchedBtnClick() {
  let watched = loadFromLocalStorage('watched');
  PAGE_OPEN = 1;
  if(!watched) {
    return
  } else if
  (watched.length === 0) {
    refs.textOoops.classList.remove('visually-hidden');
    refs.watchedList.innerHTML = '';
    return;
  }
  renderList(watched);
}
function onLibQueueBtnClick() {
  let queue = loadFromLocalStorage('queue');

  PAGE_OPEN = 2;
  if(!queue) {
    return
  } else if (queue.length === 0) {
    refs.textOoops.classList.remove('visually-hidden');
    refs.watchedList.innerHTML = '';
    return;
  }

  renderList(queue);
}

export function renderList(array) {
  const filmList = array;

  if (filmList.length === 0) {
    refs.textOoops.classList.remove('visually-hidden');
    refs.watchedList.innerHTML = '';
    return;
  }

  const watchedList = makeList(filmList);

  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.innerHTML = '';
  refs.watchedList.classList.remove('visually-hidden');
  refs.watchedList.insertAdjacentHTML('beforeend', watchedList);
  makeRatingColor();

  function makeList(array) {
    return array.reduce((acc, el) => {
      return acc + makeLibraryGalleryMarkUp(el);
    }, '');
  }
}

window.addEventListener('load', () => {
  if (refs.watchedBtn) {
    refs.watchedBtn.checked = true;
    refs.watchedBtn.parentNode.classList.add('checked');
  }
});
