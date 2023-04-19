import axios from 'axios';
import * as basicLightbox from 'basiclightbox'

const API_KEY = 'c05652c397b2dd01065e8cba4a8a45ab';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';

export async function fetchTrailer(id) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return data;
  } catch (error) {
    console.error('Smth wrong with api get full trends' + error);
  }
}


export const handleApiTrailerData = async (pickedMovieId) => {
 
  try {
    await fetchTrailer(pickedMovieId).then(el => {

      const trailerKey = el.results[0].key;
      const instance = basicLightbox.create(`<iframe class="trailerPlayer" src="https://www.youtube.com/embed/${trailerKey}" width="1200" height="800" frameborder="0"></iframe>`);

      instance.show();
      if (instance.show()) { 
        window.addEventListener('keydown', (event) => { 
            if (event.key === 'Escape') { 
                instance.close(); 
            }     
        }) 
    }
    }
      );

    } catch (err) {
    console.log(err);
  }

};
