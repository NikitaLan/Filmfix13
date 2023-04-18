'use strict';
import axios from 'axios';

// ---------------------------------------- Запит на бекенд------------------------------

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

export const fetchPictures = async pickedMovieId => {
  try {
    const result = await axios.get(
      `${BASE_URL}${pickedMovieId}?api_key=${API_KEY}`
    );
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};