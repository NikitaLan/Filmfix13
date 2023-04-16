import Notiflix from 'notiflix';
import { ThemoviedbAPI } from './themoviedb-api';
import cardMarkup from '../js/cardMarkup.hbs';
import {getGenres} from './createGenres';
import { createCustomProperties } from './customPropertiesToResults';
import makeRatingColor from './ratingColor'

// import createGalleryCards from '../templates/gallery-card.hbs';

const searchFormEl = document.querySelector('#search-form');
const gallaryListEl = document.querySelector('.gallery-home__list');

let currentQuery = '';

const themoviedbAPI = new ThemoviedbAPI();

const fetchMovie = async () => {
  try {
    const data = await themoviedbAPI.fetchMovie();
    return data;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(error.message);
  }
};

const handleSearchFormSubmit = async event => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (!currentQuery) {
    return;
  }

  themoviedbAPI.query = currentQuery;

  event.currentTarget.elements.searchQuery.value = '';

  try {
    const {results, total_results} = await fetchMovie();

    console.log(results);

    if (!results.length) {
      Notiflix.Notify.warning(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
      return;
    }
 
    

    Notiflix.Notify.success(`Hooray! We found ${total_results} movies.`);

    
      const allGenres = getGenres();
      const fullTrendData = createCustomProperties(results, allGenres);
      gallaryListEl.innerHTML = cardMarkup(fullTrendData);
      makeRatingColor();

  
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(error.message);
  }
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
