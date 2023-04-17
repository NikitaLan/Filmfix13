'use strict';
import axios from 'axios';
import modalMoviePlaceholder from '../images/noImage-placeholder.jpg';
import {
  createArrayLocalStorage,
  loadFromLocalStorage,
  removeLocalStorage,
} from '/src/js/add-to-watched'; // 💙💛 Koshyk Kostiantyn

const refs = {
  movieModal: document.querySelector('[data-modal]'), //<div> бекдроп
  closeMovieModalBtn: document.querySelector('[data-modal-close]'), //<button>
  galleryTrendList: document.querySelector('.gallery-home__list'), //<ul> з трендовими фільмами
  sectionForRenderIn: document.querySelector('.modal-movie__content'), //<section>
  btnsWrap: document.querySelector('.modal-movie__command-btns-wrap'),  //контейнер для кнопок
  btnAddToWatched: document.querySelector('.modal-movie__add-to-watched-btn'), // 💙💛 Koshyk Kostiantyn
  btnQueue: document.querySelector('.modal-movie__add-to-queue-btn'), // 💙💛 Koshyk Kostiantyn
};

refs.galleryTrendList.addEventListener('click', handleTrandingMoviesClick); //<ul> з трендовими фільмами

removeLocalStorage('watched'); // 💙💛 Koshyk Kostiantyn
removeLocalStorage('queue'); // 💙💛 Koshyk Kostiantyn

async function handleTrandingMoviesClick(event) {
  // в результаті кліку на будь-яку картку фільму:
  let pickedMovieId = event.target.dataset.id;

  createArrayLocalStorage('watched'); // 💙💛 Koshyk Kostiantyn
  createArrayLocalStorage('queue'); // 💙💛 Koshyk Kostiantyn
  renameBtn(
    refs.btnAddToWatched,
    'watched',
    'Add to watched',
    'Remove from watched',
    pickedMovieId
  ); // 💙💛 Koshyk Kostiantyn
  renameBtn(
    refs.btnQueue,
    'queue',
    'Add to queue',
    'Remove from queue',
    pickedMovieId
  ); // 💙💛 Koshyk Kostiantyn

  // 💙💛 Koshyk Kostiantyn (для использования в add-to-watched.js)
  dataModalFilm = fetchPictures(pickedMovieId);

  if (
    event.target.nodeName !== 'IMG' &&
    event.target.nodeName !== 'P' &&
    event.target.nodeName !== 'H2' &&
    event.target.nodeName !== 'H3' &&
    event.target.nodeName !== 'B'
  ) {
    return;
  }
  refs.movieModal.classList.remove('is-hidden'); //відкриття модалки

  // слухачі з обробниками подій для закриття модалки
  refs.movieModal.addEventListener('click', handleBackdropClick); //модалка для бекдропа
  refs.closeMovieModalBtn.addEventListener(
    'click',
    handleCloseMovieModalBtnClick
  ); //кнопка "Х"
  window.addEventListener('keydown', handleMovieModalKeyPress); //window для Esc

  refs.sectionForRenderIn.innerHTML = '';

  try {
    const {
      poster_path,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genres,
      overview,
    } = await fetchPictures(pickedMovieId);

    const eachGenre = genres.map(genre => {
      return ' ' + genre.name;
    });

    let roundedVote_average = null;
    if (vote_average < 10.0) {
      roundedVote_average = vote_average.toPrecision(2); //округлення дробових чисел (2 цифри)
    } else {
      roundedVote_average = vote_average.toPrecision(3);
    }

    const cardMarkup = renderCardMarkup(
      poster_path,
      roundedVote_average,
      vote_count,
      popularity,
      original_title,
      eachGenre,
      overview
    );
    refs.sectionForRenderIn.insertAdjacentHTML('beforeend', cardMarkup);
  } catch (err) {
    console.log(err);
  }
  document.body.style.overflow = 'hidden'; //щоб body не скролився при відкритій модалці

  positionBtnsContainer();  // динамічне позиціонування контейнера з кнопками
}

// ---------------------------------------- Запит на бекенд------------------------------

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

let dataModalFilm = {}; // для использования в add-to-watched.js

const fetchPictures = async pickedMovieId => {
  try {
    const result = await axios.get(
      `${BASE_URL}${pickedMovieId}?api_key=${API_KEY}`
    );
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//----------------------------------------------- Рендер розмітки ----------------------------------------

function renderCardMarkup(
  poster_path,
  vote_average,
  vote_count,
  popularity,
  original_title,
  eachGenre,
  overview
) {
  return `
    <div class="modal-movie__poster-wrapper"> 
        ${
          poster_path // рендер по умові
            ? `<img class="modal-movie__poster" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="movie poster">`
            : `<img class="modal-movie__poster" src="${modalMoviePlaceholder}" alt="movie placeholder">`
        }
    </div>
    <div class="modal-movie__container">
        ${
          original_title.length === 0
            ? `<h2 class="modal-movie__title">Not found</h2>`
            : `<h2 class="modal-movie__title">${original_title}</h2>`
        }
        <ul>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Vote / Votes</p>
                <div>
                    <span class="modal-movie__meta-data modal-movie__meta-data--red">${vote_average}</span>/<span class="modal-movie__meta-data modal-movie__meta-data--grey">${vote_count}</span>
                </div>
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Popularity</p>
                ${
                  popularity.length === 0
                    ? `<span class="modal-movie__meta-data" style="line-height: 14.06px")>Not found</span>`
                    : `<span class="modal-movie__meta-data" style="line-height: 14.06px")>${popularity}</span>`
                }
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Original Title</p>
                ${
                  original_title.length === 0
                    ? `<span class="modal-movie__meta-data" style="text-transform: uppercase">Not found</span>`
                    : `<span class="modal-movie__meta-data" style="text-transform: uppercase">${original_title}</span>`
                }
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Genre</p>
                ${
                  eachGenre.length === 0
                    ? `<span class="modal-movie__meta-data">Not found</span>`
                    : `<span class="modal-movie__meta-data">${eachGenre}</span>`
                }
            </li>
        </ul>
        <h3 class="modal-movie__header-overview">About</h3>
        ${
          overview.length === 0
            ? `<p class="modal-movie__text-overview">Not found</p>`
            : `<p class="modal-movie__text-overview">${overview}</p>`
        }
    </div>
    `;
}


// ------------------------Динамічне позиціонування кнопок-------------------------------

function positionBtnsContainer() {
    // Динамічне обчислення padding-top модалки
    const movieModalContainer = document.querySelector(".modal-movie"); // модалка
    const modalStyles = window.getComputedStyle(movieModalContainer);
    //console.log('padding-top:', modalStyles.paddingTop);  // значення padding-top модалки (з 'px')
    const ModalPaddingTop = Number.parseFloat(modalStyles.paddingTop); // чистий padding-top модалки без 'px'
    const ModalPaddingRight = Number.parseFloat(modalStyles.paddingRight); // чистий padding-right модалки без 'px'
    
    //Динамічне обчислення width блоку з кнопками (<div>)
    const btnsWrapStyles = window.getComputedStyle(refs.btnsWrap);
    dinamicWidthOfBtnsWrap = Number.parseFloat(btnsWrapStyles.width);
    
    // Динамічне обчислення height і width текстового змісту модалки <div>
    const div = document.querySelector('.modal-movie__container'); // контейнер для текстового змісту модалки  
    const divStyles = window.getComputedStyle(div);
    //console.log('height:', divStyles.height); // значення height <div> (з 'px')
    //console.log('width:', divStyles.width);   // значення width <div> (з 'px')
    //console.log(Number.parseFloat(divStyles.height)); // чиста висота <div> без 'px'
    //console.log(Number.parseFloat(divStyles.height) + ModalPaddingTop + 20 + 'px'); // висота <div> з padding-top і margin-bottom
    dinamicTopCoordinateForBtns = Number.parseFloat(divStyles.height) + ModalPaddingTop + 20 + 'px';  // верхня координата
    dinamicRightCoordinateForBtns = (Number.parseFloat(divStyles.width) + ModalPaddingRight) - dinamicWidthOfBtnsWrap + 'px';  // права координата
    // console.log("top", dinamicTopCoordinateForBtns);
    // console.log("right", dinamicRightCoordinateForBtns);    
    
    
    refs.btnsWrap.style.top = dinamicTopCoordinateForBtns;  // задали кнопці верхню координату
    refs.btnsWrap.style.right = dinamicRightCoordinateForBtns;  // задали кнопці праву координату
    }
    
    
// --------------------------- Закриття модалки -----------------------------------------------  

function handleBackdropClick(event) {
  //слухач на модалці для кліка на бекдроп
  if (event.currentTarget === event.target) {
    refs.movieModal.classList.add('is-hidden'); //закрий модалку
    document.body.style.overflow = 'visible'; //body почне скролитися після закриття модалки
    removeEventListeners();
  }
}

function handleCloseMovieModalBtnClick() {
  //клікнувши на кнопку
  refs.movieModal.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
  removeEventListeners();
}

function handleMovieModalKeyPress(event) {
  //клікнувши на Escape
  //console.log(event.code);
  if (event.code === 'Escape') {
    refs.movieModal.classList.add('is-hidden');
    document.body.style.overflow = 'visible';
    removeEventListeners();
  }
}

// Зняття всіх слухачів
function removeEventListeners() {
  refs.movieModal.removeEventListener('click', handleBackdropClick);
  refs.closeMovieModalBtn.removeEventListener(
    'click',
    handleCloseMovieModalBtnClick
  );
  window.removeEventListener('keydown', handleMovieModalKeyPress);
}

// 💙💛 Koshyk Kostiantyn функция изменяет название кнопки
function renameBtn(btn, key, nameA, nameB, id) {
  if (!loadFromLocalStorage(key).includes(Number(id))) {
    btn.textContent = nameA;
    btn.classList.remove('active-btn');
  } else {
    btn.textContent = nameB;
    btn.classList.add('active-btn');
  }
}

// 💙💛 Koshyk Kostiantyn (для использования в add-to-watched.js)
export { dataModalFilm, refs };
