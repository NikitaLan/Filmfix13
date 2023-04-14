import { createGenresFromTrend } from './createGenres';

export function createCustomProperties(films, allGenres) {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genresString: createGenresFromTrend(film.genre_ids, allGenres),
  }));
}

function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}
