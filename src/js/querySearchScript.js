import Notiflix from 'notiflix';
import { ThemoviedbAPI } from './themoviedb-api';
import createGalleryCards from '../templates/gallery-card.hbs

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
    const data = await fetchMovie();

    console.log(data);

    if (!data.results.length) {
      Notiflix.Notify.warning(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${data.total_results} movies.`);

    gallaryListEl.innerHTML = createGalleryCards(data.results);
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(error.message);
  }
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
