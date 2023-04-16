import { getTrendFilmData } from './fetchTrending';
import { Paginator } from './pagination';

document.addEventListener('DOMContentLoaded', startPage);
const gallaryListEl = document.querySelector('.gallery-home__list');

async function startPage(page) {
  try {
    let paginator = new Paginator(gallaryListEl, getTrendFilmData);
    await paginator.initPaginator();
  } catch (error) {
    console.error('Smth wrong with start page fetch' + error);
  }
}
