"use strict";

const refs = {
    openMovieModalBtn: document.querySelector("[data-modal-open]"),                //<button>
    closeMovieModalBtn: document.querySelector("[data-modal-close]"),              //<button>
    movieModal: document.querySelector("[data-modal]"),                            //<div>
    addToWatchedBtn: document.querySelector ('.modal-movie__add-to-watched-btn'),  //<button>
    addToQueueBtn: document.querySelector('.modal-movie__add-to-queue-btn'),       // <button>
    sectionForRenderIn: document.querySelector('.modal-movie__content'),           // <section>
};

//Відкриття і закриття модального вікна
refs.openMovieModalBtn.addEventListener("click", handleMovieModalBtnClick);
refs.closeMovieModalBtn.addEventListener("click", handleMovieModalBtnClick);
refs.movieModal.addEventListener('click', handleBackdropClick);
window.addEventListener("keydown", handleMovieModalKeyPress);

  
function handleMovieModalBtnClick() {
    refs.movieModal.classList.toggle("is-hidden"); //відкриття і закриття, клікнувши на кнопку 
}

function handleBackdropClick(event) {  //закриття, клікнувши на бекдроп 
    if(event.currentTarget === event.target) {
        handleMovieModalBtnClick();
    }
}

function handleMovieModalKeyPress(event) {  //закриття, клікнувши на Escape
    console.log(event.code);
    if(event.code === 'Escape') {
        handleMovieModalBtnClick();
    }
} 

// function removeEventListener() {
//     refs.openMovieModalBtn.removeEventListener("click", handleMovieModalBtnClick);
//     refs.closeMovieModalBtn.removeEventListener("click", handleMovieModalClick);
//     window.removeEventListener("keydown", handleMovieModalKeyPress); 
// }
// removeEventListener();

//  if (event.target.nodeName !== "BUTTON") {



const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';
let movieId = 550;

const fetchPictures = () => {
    return fetch(`${BASE_URL}${movieId}?api_key=${API_KEY}`)
        .then(response => {
            if(!response.ok) {
                throw new Error (response.status);
            }
            return response.json(); 
        });
}

fetchPictures().then(({id, poster_path, vote_average, vote_count, popularity, original_title, genres, overview}) => {
    const eachGenre = genres.map(genre => {
        return " " + genre.name;
    })

    const cardMarkup = renderCardMarkup(poster_path, vote_average, vote_count, popularity, original_title, eachGenre, overview);    
    refs.sectionForRenderIn.insertAdjacentHTML('beforeend', cardMarkup);
});

function renderCardMarkup(poster_path, vote_average, vote_count, popularity, original_title, eachGenre, overview) {
    return `
    <div class="modal-movie__poster-wrapper">
        <img class="modal-movie__poster" src="https://www.themoviedb.org/t/p/w500${poster_path}" alt="movie poster" width="100%" height="100%">
    </div>
    <div>
        <h2 class="modal-movie__title">${original_title}</h2>
        <ul>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Vote / Votes</p>
                <div>
                    <span class="modal-movie__meta-data modal-movie__meta-data--red">${vote_average}</span>/<span class="modal-movie__meta-data modal-movie__meta-data--grey">${vote_count}</span>
                </div>
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Popularity</p>
                <span class="modal-movie__meta-data">${popularity}</span>
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Original Title</p>
                <span class="modal-movie__meta-data">${original_title}</span>
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Genre</p>
                <span class="modal-movie__meta-data">${eachGenre}</span>
            </li>
        </ul>
        <h3 class="modal-movie__header-overview">About</h3>
        <p class="modal-movie__text-overview">${overview}</p> 
        <div class="modal-movie__command-btns"> 
            <button class="modal-movie__add-to-watched-btn" type="button">add to Watched</button>
            <button class="modal-movie__add-to-queue-btn" type="button">add to queue</button>         
        </div>
    </div>
    `;
}

// Робота командних кнопок  
//refs.addToWatchedBtn.addEventListener('click', handleAddToWatchedBtnClick);

// function handleAddToWatchedBtnClick {

// }
// refs.addToQueueBtn.addEventListener('click', handleAddToQueueBtn);