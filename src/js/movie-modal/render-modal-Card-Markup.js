'use strict';
//---------------------------------------- Рендер розмітки ----------------------------------------

export const renderCardMarkup = (
    poster_path,
    vote_average,
    vote_count,
    popularity,
    original_title,
    eachGenre,
    overview
  ) => {
    return `
      <div class="modal-movie__poster-wrapper"> 
          ${
            poster_path // рендер по умові
              ? `<img class="modal-movie__poster" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="movie poster">`
              : `<img class="modal-movie__poster" src="https://image.tmdb.org/t/p/w500/dykOcAqI01Fci5cKQW3bEUrPWwU.jpg" alt="movie placeholder">`
          }
      </div>
      <div class="modal-movie__container">
          ${
            original_title.length === 0
              ? `<h2 class="modal-movie__title">Not found</h2>`
              : `<h2 class="modal-movie__title">${original_title}</h2>`
          }
          <ul>
              <li class="modal-movie__meta-wrapper">
                  <p class="modal-movie__meta">Vote / Votes</p>
                  <div>
                      <span class="modal-movie__meta-data modal-movie__meta-data--red">${vote_average}</span>/<span class="modal-movie__meta-data modal-movie__meta-data--grey">${vote_count}</span>
                  </div>
              </li>
              <li class="modal-movie__meta-wrapper">
                  <p class="modal-movie__meta">Popularity</p>
                  ${
                    popularity.length === 0
                      ? `<span class="modal-movie__meta-data" style="line-height: 14.06px")>Not found</span>`
                      : `<span class="modal-movie__meta-data" style="line-height: 14.06px")>${popularity}</span>`
                  }
              </li>
              <li class="modal-movie__meta-wrapper">
                  <p class="modal-movie__meta">Original Title</p>
                  ${
                    original_title.length === 0
                      ? `<span class="modal-movie__meta-data" style="text-transform: uppercase">Not found</span>`
                      : `<span class="modal-movie__meta-data" style="text-transform: uppercase">${original_title}</span>`
                  }
              </li>
              <li class="modal-movie__meta-wrapper">
                  <p class="modal-movie__meta">Genre</p>
                  ${
                    eachGenre.length === 0
                      ? `<span class="modal-movie__meta-data">Not found</span>`
                      : `<span class="modal-movie__meta-data">${eachGenre}</span>`
                  }
              </li>
          </ul>
          <h3 class="modal-movie__header-overview">About</h3>
          ${
            overview.length === 0
              ? `<p class="modal-movie__text-overview">Not found</p>`
              : `<p class="modal-movie__text-overview">${overview}</p>`
          }
      </div>
      `;
  }