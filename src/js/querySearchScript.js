import Notiflix from 'notiflix';
import { ThemoviedbAPI } from './themoviedb-api';
import { Paginator } from './pagination';
import { loading } from './loader';

const searchFormEl = document.querySelector('#search-form');
const gallaryListEl = document.querySelector('.gallery-home__list');
const textOoops = document.querySelector('.empty');

let paginator;
let currentQuery = '';

const themoviedbAPI = new ThemoviedbAPI();

const fetchMovie = async page => {
  try {
    loading.start();
    const data = await themoviedbAPI.fetchMovie(page);
    loading.finish();
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
    paginator = new Paginator(gallaryListEl, fetchMovie);
    await paginator.initPaginator();
    let results = paginator.getResults();

    if (!results.results.length) {
      Notiflix.Notify.warning(
        'Sorry, there are no movies matching your search query. Please try again.'
      );

      textOoops.classList.remove('visually-hidden');
      return;
    }

    Notiflix.Notify.success(
      `Hooray! We found ${results.total_results} movies.`
    );
    textOoops.classList.add('visually-hidden');
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(error.message);
  }
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
