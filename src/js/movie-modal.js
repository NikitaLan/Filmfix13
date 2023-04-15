"use strict";
import axios from "axios";

const refs = {
    closeMovieModalBtn: document.querySelector("[data-modal-close]"),              //<button>
    movieModal: document.querySelector("[data-modal]"),                            //<div>
    addToWatchedBtn: document.querySelector ('.modal-movie__add-to-watched-btn'),  //<button>
    addToQueueBtn: document.querySelector('.modal-movie__add-to-queue-btn'),       //<button>
    sectionForRenderIn: document.querySelector('.modal-movie__content'),           //<section>
    galleryTrendList: document.querySelector('.gallery-home__list'),               //<ul> з трендовими фільмами
};


//Відкриття і закриття модального вікна
refs.closeMovieModalBtn.addEventListener("click", handleMovieModalClick);
refs.movieModal.addEventListener('click', handleBackdropClick);
window.addEventListener("keydown", handleMovieModalKeyPress);
refs.galleryTrendList.addEventListener('click', handleTrandingMoviesClick);

  
function handleMovieModalClick() {
    refs.movieModal.classList.toggle("is-hidden"); //відкриття і закриття, клікнувши на кнопку 
}

function handleBackdropClick(event) {  //закриття, клікнувши на бекдроп 
    if(event.currentTarget === event.target) {
        handleMovieModalClick();
    }
}

function handleMovieModalKeyPress(event) {  //закриття, клікнувши на Escape
    console.log(event.code);
    if(event.code === 'Escape') {
        handleMovieModalClick();
    }
} 

// function removeEventListener() {
//     refs.openMovieModalBtn.removeEventListener("click", handleMovieModalBtnClick);
//     refs.closeMovieModalBtn.removeEventListener("click", handleMovieModalClick);
//     window.removeEventListener("keydown", handleMovieModalKeyPress); 
// }
// removeEventListener();

// ---------------------------------------- Запит на бекенд------------------------------

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

async function handleTrandingMoviesClick(event) {  // в результаті кліку на будь-яку картку фільму:
    let pickedMovieId = event.target.dataset.id;
    
    if (event.target.nodeName !== "IMG" && event.target.nodeName !== "P" && event.target.nodeName !== "H2" && event.target.nodeName !== "H3" && event.target.nodeName !== "B") {
        return;
    }
    handleMovieModalClick();
    refs.sectionForRenderIn.innerHTML = "";

    try {
        const {poster_path, vote_average, vote_count, popularity, original_title, genres, overview} = await fetchPictures(pickedMovieId);
        
        const eachGenre = genres.map(genre => {
            return " " + genre.name;
        });

        let roundedVote_average = null;
        if(vote_average < 10.0) {        
            roundedVote_average = vote_average.toPrecision(2);  //округлення дробових чисел (2 цифри)
        } else {
            roundedVote_average = vote_average.toPrecision(3);
        }
        
        const cardMarkup = renderCardMarkup(poster_path, roundedVote_average, vote_count, popularity, original_title, eachGenre, overview);    
        refs.sectionForRenderIn.insertAdjacentHTML('beforeend', cardMarkup);
    } catch(err) {
        console.log(err);
    }
}


const fetchPictures = async (pickedMovieId) => {
    try {
        const result = await axios.get(`${BASE_URL}${pickedMovieId}?api_key=${API_KEY}`);
        return result.data; 
    } catch(error) {
        throw new Error(error.message);
    }
}


function renderCardMarkup(poster_path, vote_average, vote_count, popularity, original_title, eachGenre, overview) {
    return `
    <div class="modal-movie__poster-wrapper"> 
        <img class="modal-movie__poster" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="movie poster">
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
                <span class="modal-movie__meta-data" style="text-transform: uppercase">${original_title}</span>
            </li>
            <li class="modal-movie__meta-wrapper">
                <p class="modal-movie__meta">Genre</p>
                <span class="modal-movie__meta-data">${eachGenre}</span>
            </li>
        </ul>
        <h3 class="modal-movie__header-overview">About</h3>
        <p class="modal-movie__text-overview">${overview}</p> 
    </div>
    `;
}

// Робота командних кнопок  
//refs.addToWatchedBtn.addEventListener('click', handleAddToWatchedBtnClick);
// function handleAddToWatchedBtnClick {
// }
// refs.addToQueueBtn.addEventListener('click', handleAddToQueueBtn);