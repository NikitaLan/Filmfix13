import { makeFilmMarkUp } from '../js/makeGalleryMarkUpCard';

const refs = {
  queueBtn: document.querySelector('.btn-queue'),
  queueList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
  // loader: document.querySelector('wrapper'),
  myLibraryBtn: document.querySelector('.btn-mylibrary'),
  hrefMyLib: document.querySelector('.href-mylib'),
};

const STORAGE_KEY = 'queue';
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

refs.queueBtn.addEventListener('click', takeListFromStorage);
// refs.myLibraryBtn.addEventListener('click', takeListFromStorage);

// function onLibraryBtnClick() {
//   e.preventDefault();
//   takeListFromStorage(e);
//   refs.textOoops.classList.add('visually-hidden');
//   refs.watchedList.classList.remove('visually-hidden');
// }

function takeListFromStorage(e) {
  // e.preventDefault();
  console.log('click on btn Queue');
  refs.queueList.innerHTML = '';
  const listFromStorage = load(STORAGE_KEY);
  listFromStorage.map(el => {
    getMovieInfoById(el).then(data => {
      console.log(data);
      return refs.queueList.insertAdjacentHTML(
        'beforeend',
        makeFilmMarkUp(data)
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
  refs.queueList.classList.remove('visually-hidden');
}
