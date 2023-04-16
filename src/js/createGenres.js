import { allGenres } from './allGenresList';

export const getGenres = function getGenres() {
  const { genres } = allGenres;
  return genres;
}

export const createGenresFromTrend = function createGenresFromTrend(array, genres) {
  const genresArray = array
    .map(id => genres.filter(element => element.id === id))
    .flat();

  if (genresArray.length > 2) {
    let newArray = genresArray.slice(0, 2);
    return newArray.map(el => {console.log(el)
     return el.name}).join(', ') + ', Other';
  } else if (genresArray.length == 0) {
    return "Not found"
  }
  else {
    return genresArray.map(el => el.name).join(', ');
  }
}
