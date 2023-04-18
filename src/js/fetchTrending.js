import axios from 'axios';
import { loading } from './loader';

const API_KEY = 'c05652c397b2dd01065e8cba4a8a45ab';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/week`;

export async function getTrendFilmData(page) {
  try {
    loading.start();
    const { data } = await axios.get(
      `${TREND_URL}?api_key=${API_KEY}&page=${page}`
    );
    loading.finish();
    return data;
  } catch (error) {
    console.error('Smth wrong with api get full trends' + error);
  }
}
