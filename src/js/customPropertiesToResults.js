import { createGenresFromTrend } from './createGenres';

export function createCustomProperties(films, allGenres) {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genresString: createGenresFromTrend(film.genre_ids, allGenres),
    rate: film.vote_average.toFixed(1),
  }));
}

function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}
