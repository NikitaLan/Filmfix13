import axios from 'axios';

const allGenres = {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ],
};

const API_KEY = 'c05652c397b2dd01065e8cba4a8a45ab';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;

const galleryTrendListEl = document.querySelector('.gallery-home__list');

async function getTrendFilmData(page) {
  try {
    const { data } = await axios.get(
      `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    );

    return data;
  } catch (error) {
    console.error('Smth wrong with api get full trends' + error);
  }
}
document.addEventListener('DOMContentLoaded', startPage);

function getGenres() {
  const { genres } = allGenres;
  return genres;
}

function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}
// Создание нового свойства с жанрами для трендов
function createGenresFromTrend(array, genres) {
  const genresArray = array
    .map(id => genres.filter(element => element.id === id))
    .flat();

  if (genresArray.length > 2) {
    let newArray = genresArray.slice(0, 2);
    return newArray.map(el => el.name).join(', ') + ', Other';
  } else {
    return genresArray.map(el => el.name).join(', ');
  }
}

function createString(array) {
  console.log(array);
}

function dataCombine(films, allGenres) {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genresString: createGenresFromTrend(film.genre_ids, allGenres),
  }));
}

async function startPage() {
  try {
    const { results } = await getTrendFilmData(1);
    const allGenres = getGenres();

    const fullTrendData = dataCombine(results, allGenres);

    // const size = defineResultsPerPage(); --- пагинация
    renderTrendGallery(fullTrendData);
  } catch (error) {
    console.error('Smth wrong with start page fetch' + error);
  }
}

function renderTrendGallery(filmData) {
  console.log(filmData);
  const trendMarkUP = filmData
    .map(
      ({ poster_path, title, genresString, year }) =>
        `<li class="gallery-home__list-item">
        <a class="gallery-home__list-link">
            <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" loading="lazy" width="100" height="100"/>
        <div class="gallery-home__info">
          <h2 class="gallery-home__info-title">${title}</h2>
          <p class="gallery-home__info-text">
            ${genresString} | ${year}
          </p>
        </div>
        </a>
      </li>
      `
    )
    .join('');
  galleryTrendListEl.insertAdjacentHTML('afterbegin', trendMarkUP);
}
