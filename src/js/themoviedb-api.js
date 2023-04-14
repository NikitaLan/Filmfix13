import axios from 'axios';

export class ThemoviedbAPI {
  #API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';
  #BASE_URL = 'https://api.themoviedb.org/3';

  searchPath = '/search/movie';

  query = null;
  page = 1;

  baseSearchParams = {
    api_key: this.#API_KEY,
    searchPath: this.searchPath,
  };

  async fetchMovie() {
    const searchParams = new URLSearchParams({
      query: this.query,
      page: this.page,
      ...this.baseSearchParams,
    });

    try {
      const response = await axios.get(
        `${this.#BASE_URL}${this.searchPath}?${searchParams}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
