import { allGenres } from '../genre/allGenreList';

export const createGenresFromTrend = array => {
  if (!Array.isArray(array)) {
    return 'Unknown genre';
  }
  const genreResult = allGenres
    .filter(({ id }) => array.includes(id))
    .map(({ name }) => name);
  if (!genreResult.length) {
    return 'Unknown genre';
  } else if (genreResult.length > 2) {
    return `${genreResult.slice(0, 2).join(', ')}, Other`;
  } else {
    return genreResult.join(', ');
  }
};

export const createGenresFromLibrary = array => {
  const genre = array.map(el => {
    return ' ' + el.name;
  });
  if (!genre.length) {
    return 'Unknown genre';
  } else if (genre.length > 2) {
    return `${genre.slice(0, 2).join(', ')}, Other`;
  } else {
    return genre.join(', ');
  }
};
