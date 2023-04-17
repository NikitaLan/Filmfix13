// import basicLightbox from 'basiclightbox';
const trailerBtn = document.querySelector('.modal-movie__trailer-btn');
 
// trailerBtn.addEventListener('click', handleTrailerBtnClick)


// function handleTrailerBtnClick(trailerKey) {
//   fetchTrailer(id)
//     .then(e => {
//       trailerKey = e.results[0].key;
//       const instance = basicLightbox.create(`
//   <iframe class="trailerPlayer" src="https://www.youtube.com/embed/${trailerKey}" width="1200" height="800" frameborder="0"></iframe>
// `);

//       instance.show();
//     })
//     .catch(error => {
//       trailer.setAttribute('disabled', 'disabled');
//       trailer.textContent = 'no trailer';
//     });
// }

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';


const fetchTrailer = async(id) => {
    try {
      const response = await fetch(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      const results = await data
      return results} 
      catch(error) {
        throw new Error(error.message);
    }
}
