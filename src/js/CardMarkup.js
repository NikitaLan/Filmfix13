export function renderTrendGallery(filmData) {
  const galleryTrendListEl = document.querySelector('.gallery-home__list');

  const trendMarkUP = filmData
    .map(
      ({ poster_path, title, genresString, year }) =>
        `<li class="gallery-home__list-item">
        <a class="gallery-home__list-link">
            <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" loading="lazy" width="100" height="100"/>
        <div class="gallery-home__info">
          <h2 class="gallery-home__info-title">${title}</h2>
          <p class="gallery-home__info-text">
            ${genresString} | ${year}
          </p>
        </div>
        </a>
      </li>
      `
    )
    .join('');
  galleryTrendListEl.insertAdjacentHTML('afterbegin', trendMarkUP);
}
