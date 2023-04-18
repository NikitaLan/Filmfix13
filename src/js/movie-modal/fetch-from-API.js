'use strict';
import axios from 'axios';
import { loading } from '../loader';

// ---------------------------------------- Запит на бекенд------------------------------

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

export const fetchPictures = async pickedMovieId => {
  try {
    loading.start();
    const result = await axios.get(
      `${BASE_URL}${pickedMovieId}?api_key=${API_KEY}`
    );
    loading.finish();
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
