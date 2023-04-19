// ------------------------------1 vertion
// import basicLightbox from 'basiclightbox';
// import axios from 'axios';
// const trailerBtn = document.querySelector('.modal-movie__trailer-btn');
 
// trailerBtn.addEventListener('click', handleTrailerBtnClick)

// let movie

// function handleTrailerBtnClick(trailerKey) {
//   fetchMovie(movie.id)
//     .then(e => {
//       trailerKey = e.results[0].key;
//       const instance = basicLightbox.create(`
//   <iframe class="trailerPlayer" src="https://www.youtube.com/embed/${trailerKey}" width="1200" height="800" frameborder="0"></iframe>
// `);

//       instance.show();
//     })
//     .catch(error => {
//       trailerBtn.setAttribute('disabled', 'disabled');
//       trailerBtn.textContent = 'no trailer';
//     });
// }

// const BASE_URL = 'https://api.themoviedb.org/3/movie/';
// const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';


// export const fetchMovie = async pickedMovieId => {
//   try {
//     const result = await axios.get(
//       `${BASE_URL}${pickedMovieId}/videos?api_key=${API_KEY}`
//     );
//     return result.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // const fetchTrailer = async(id) => {
// //     try {
// //       const response = await fetch(`${BASE_URL}${id}/videos?api_key=${API_KEY}`);
// //       const data = await response.json();
// //       const results = await data
// //       return results} 
// //       catch(error) {
// //         throw new Error(error.message);
// //     }
// // }

// -----------------------------2 vertion
// import axios from 'axios';

// const BASE_URL = 'https://api.themoviedb.org/3/movie/';
// const API_KEY = '3dd9518c386fd347d5f1ac2580a699a4';

// export function trailerBtnListener (key) {
//   const trailerBtn = document.querySelector('.modal-movie__trailer-btn')
//   trailerBtn.setAttribute('key', key)
//   trailerBtn.addEventListener('click', trailerMarkup)
// }

// const getMoviesTrailer = async key => {
//   const { data } = await axios.get(`${BASE_URL}${key}/videos?api_key=${API_KEY}`);

//   return data.results.filter(item => {
//     if (item.site === 'YouTube') {
//       return item;
//     }
//   });
// };

// export const movieTrailer = async keyId => {
//   let movie = '';
//   await getMoviesTrailer(keyId).then(
//     r => (movie = `https://www.youtube.com/embed/${r[0].key}`))
//     .catch(error => movie=false)
    
//   return movie;
 
// };

// export async function trailerMarkup(event)  {
//   const movieId = Number(event.target.getAttribute('key'))
//   const trailerBtn = document.querySelector('.modal-movie__trailer-btn')
//   const modalBackdrop = document.querySelector('.modal-movie__content')
//   trailerBtn.setAttribute('disabled', true)

//   await movieTrailer(movieId).then(r => {
//     if(r) {modalBackdrop.firstElementChild.insertAdjacentHTML('beforeend', 
//       `<iframe id="ytplayer" type="text/html" width="782" height="360"
//       src="${r}"
//       frameborder="0"/>`)
//       document.querySelector('#ytplayer').scrollIntoView({block: "center", behavior: "smooth"})
//       } 
//         else {modalBackdrop.firstElementChild.insertAdjacentHTML('beforeend', 
//           `<div class="trailer-placeholder"></div>`)
//           document.querySelector('.trailer-placeholder').scrollIntoView({block: "center", behavior: "smooth"})
//           }
//     })
// }

