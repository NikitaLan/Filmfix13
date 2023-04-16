import {getGenres} from './createGenres';
import { getTrendFilmData } from './fetchTrending';
import { renderTrendGallery } from './renderingCardMarkup';
import { createCustomProperties } from './customPropertiesToResults';

document.addEventListener('DOMContentLoaded', startPage);

async function startPage() {
  try {
    const { results } = await getTrendFilmData(1);
    const allGenres = getGenres();

    const fullTrendData = createCustomProperties(results, allGenres);

    // const size = defineResultsPerPage(); --- пагинация
    renderTrendGallery(fullTrendData);
  } catch (error) {
    console.error('Smth wrong with start page fetch' + error);
  }
}


