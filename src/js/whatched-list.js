import { makeLibraryGalleryMarkUp } from '../js/makeGalleryMarkUpCard';
import makeRatingColor from './ratingColor';
const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  queueBtn: document.querySelector('.btn-queue'),

  watchedList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};
console.log(refs.queueBtn);

const STORAGE_KEY_WATCHED = 'watched';
const STORAGE_KEY_QUEUE = 'queue';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
async function getMovieInfoById(movieID) {
  const resp = await fetch(
    `${BASE_URL}${movieID}?api_key=${API_KEY}&language=en-US`
  );
  const respData = await resp.json();

  return respData;
}

refs.watchedBtn.addEventListener('click', takeListFromStorageWatched);
refs.queueBtn.addEventListener('click', takeListFromStorageQueue);

function takeListFromStorageWatched() {
  const listFromStorage = load(STORAGE_KEY_WATCHED);
//   console.log(listFromStorage);
//   if(!listFromStorage && listFromStorage == []) {
//     refs.watchedList.innerHTML = ''
//     return
//   }

  listFromStorage.map(el => {
    getMovieInfoById(el).then(data => {
      const markUp = refs.watchedList.insertAdjacentHTML(
        'beforeend',
        makeLibraryGalleryMarkUp(data)
      );
      makeRatingColor()
      return markUp;
    });
  });
  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.classList.remove('visually-hidden');
}
console.dir(refs.watchedList);
function takeListFromStorageQueue() {
    const listFromStorage = load(STORAGE_KEY_QUEUE);
    listFromStorage.map(el => {
      getMovieInfoById(el).then(data => {
        const markUp = refs.watchedList.insertAdjacentHTML(
          'beforeend',
          makeLibraryGalleryMarkUp(data)
        );
        makeRatingColor()
        return markUp;
      });
    });
    refs.textOoops.classList.add('visually-hidden');
    refs.watchedList.classList.remove('visually-hidden');
}