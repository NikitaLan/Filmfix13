import { makeLibraryGalleryMarkUp } from '../js/makeGalleryMarkUpCard';

const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  watchedList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};

const STORAGE_KEY = 'watched';
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

refs.watchedBtn.addEventListener('click', takeListFromStorage);

function takeListFromStorage() {
  console.log('click on btn Watched');
  const listFromStorage = load(STORAGE_KEY);
  listFromStorage.map(el => {
    getMovieInfoById(el).then(data => {
      console.log(data);
      return refs.watchedList.insertAdjacentHTML(
        'beforeend',
        makeLibraryGalleryMarkUp(data)
      );
    });
  });

  // const listFromStorage = localStorage.getItem(STORAGE_KEY);
  // watchedList = JSON.parse(listFromStorage);
  // console.log(watchedList.results);
  // refs.watchedList.insertAdjacentHTML(
  //   'afterbegin',
  //   cardMarkup(watchedList.results)
  // );
  refs.textOoops.classList.add('visually-hidden');
  refs.watchedList.classList.remove('visually-hidden');
}
