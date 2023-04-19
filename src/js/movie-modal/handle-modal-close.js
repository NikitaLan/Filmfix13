'use strict';

// --------------------------- Відкриття і закриття модалки -----------------------------------------------

const refs = {
  movieModal: document.querySelector('[data-modal]'), //<div> бекдроп
  closeMovieModalBtn: document.querySelector('[data-modal-close]'), //<button>
};

export const handleModalOpenClose = () => {
  refs.movieModal.classList.remove('is-hidden'); //відкриття модалки

  // слухачі з обробниками подій для закриття модалки
  refs.movieModal.addEventListener('click', handleBackdropClick); //модалка для бекдропа
  refs.closeMovieModalBtn.addEventListener(
    'click',
    handleCloseMovieModalBtnClick
  ); //кнопка "Х"
  window.addEventListener('keydown', handleMovieModalKeyPress); //window для Esc

  function handleBackdropClick(event) {
    //слухач на модалці для кліка на бекдроп
    if (event.currentTarget === event.target) {
      refs.movieModal.classList.add('is-hidden'); //закрий модалку
      document.body.style.overflow = 'visible'; //body почне скролитися після закриття модалки
      removeEventListeners();
    }
  }

  function handleCloseMovieModalBtnClick() {
    //клікнувши на кнопку
    refs.movieModal.classList.add('is-hidden');
    document.body.style.overflow = 'visible';
    removeEventListeners();
  }

  function handleMovieModalKeyPress(event) {
    //клікнувши на Escape

    if (event.code === 'Escape') {
      refs.movieModal.classList.add('is-hidden');
      document.body.style.overflow = 'visible';
      removeEventListeners();
    }
  }

  // Зняття всіх слухачів
  function removeEventListeners() {
    refs.movieModal.removeEventListener('click', handleBackdropClick);
    refs.closeMovieModalBtn.removeEventListener(
      'click',
      handleCloseMovieModalBtnClick
    );
    window.removeEventListener('keydown', handleMovieModalKeyPress);
  }
};
