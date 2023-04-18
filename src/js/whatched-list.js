import { makeLibraryGalleryMarkUp } from '../js/makeGalleryMarkUpCard';
import makeRatingColor from './ratingColor';
const refs = {
  watchedBtn: document.querySelector('.btn-watched'),
  queueBtn: document.querySelector('.btn-queue'),

  watchedList: document.querySelector('.gallery-library__list'),
  textOoops: document.querySelector('.empty'),
};

const STORAGE_KEY_WATCHED = 'watched';
const STORAGE_KEY_QUEUE = 'queue';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

export let PAGE_OPEN = 1;
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState=== null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

refs.watchedBtn.addEventListener('click', onLibWatchedBtnClick);


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

refs.queueBtn.addEventListener('click', onLibQueueBtnClick);


let watched = load(STORAGE_KEY_WATCHED);
let queue = load(STORAGE_KEY_QUEUE);

function onLibWatchedBtnClick() {
    PAGE_OPEN = 1;
    if(!watched) {

        refs.textOoops.classList.remove('visually-hidden');
        refs.watchedList.innerHTML = '';
        return
    } else if (watched.length === 0) {
console.log(20);
refs.textOoops.classList.add('visually-hidden');
refs.watchedList.innerHTML = '';
         return;
       } 
       renderList(watched)
}
function onLibQueueBtnClick() {
    PAGE_OPEN = 2;
    if(!queue) {
        refs.textOoops.classList.remove('visually-hidden');
        refs.watchedList.innerHTML = '';
        return
    } else if (queue.length === 0) {
refs.textOoops.classList.add('visually-hidden');
refs.watchedList.innerHTML = '';
         return;
       }
       renderList(queue)
}


async function getFilmInfoById(movieID) {
  const resp = await fetch(
    `${BASE_URL}${movieID}?api_key=${API_KEY}&language=en-US`
  );
  const respData = await resp.json();

  return respData;
}

async function getFilmList(array) {
    const filmPromises = array.map(el => getFilmInfoById(el));
    const filmList = await Promise.all(filmPromises);
    return filmList;
}

export async function renderList(array) {
  
    const filmList = await getFilmList(array);
    console.log(filmList);
    if(filmList.length === 0) {
refs.textOoops.classList.remove('visually-hidden');
refs.watchedList.innerHTML = `<div class="empty">
<p class="empty__text">Oops...<br> You have not added anything to your list yet.</p>
<div class="gallery-library__bg"></div>
</div>`
return;
    }

    const watchedList = makeList(filmList);
    console.log(watchedList);
    refs.textOoops.classList.add('visually-hidden');
    refs.watchedList.innerHTML = '';
    refs.watchedList.classList.remove('visually-hidden');
    refs.watchedList.insertAdjacentHTML('beforeend', watchedList)
    makeRatingColor()

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



// function takeListFromStorageWatched() {
//   const listFromStorage = load(STORAGE_KEY_WATCHED);
// //   console.log(listFromStorage);
// //   if(!listFromStorage && listFromStorage == []) {
// //     refs.watchedList.innerHTML = ''
// //     return
// //   }

//   listFromStorage.map(el => {
//     getMovieInfoById(el).then(data => {
//       const markUp = refs.watchedList.insertAdjacentHTML(
//         'beforeend',
//         makeLibraryGalleryMarkUp(data)
//       );
//       makeRatingColor()
//       return markUp;
//     });
//   });
//   refs.textOoops.classList.add('visually-hidden');
//   refs.watchedList.classList.remove('visually-hidden');
// }
// console.dir(refs.watchedList);
// function takeListFromStorageQueue() {
//     const listFromStorage = load(STORAGE_KEY_QUEUE);
//     listFromStorage.map(el => {
//       getMovieInfoById(el).then(data => {
//         const markUp = refs.watchedList.insertAdjacentHTML(
//           'beforeend',
//           makeLibraryGalleryMarkUp(data)
//         );
//         makeRatingColor()
//         return markUp;
//       });
//     });
//     refs.textOoops.classList.add('visually-hidden');
//     refs.watchedList.classList.remove('visually-hidden');
// }