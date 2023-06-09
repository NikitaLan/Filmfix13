const refs = {
  footerCloseBtn: document.querySelector('[data-footer-modal-close]'),
  footerOpenBtn: document.querySelector('[data-footer-modal-open]'),
  footerBackdrop: document.querySelector('.footer__backdrop'),
  game: document.querySelector('.memory-game'),
  modalContent: document.querySelector('.team__list'),
};

refs.footerOpenBtn.addEventListener('click', onFooterModal);

export function onFooterModal() {
  refs.footerBackdrop.classList.remove('is-hidden');
  // document.querySelector('body').classList.add('noScroll');
  document.addEventListener('keydown', closeFooterModal);
  refs.footerBackdrop.addEventListener('click', closeFooterModal);
  refs.footerCloseBtn.addEventListener('click', footerModalHidden);
  document.body.style.overflow = 'hidden';
}

function footerModalHidden() {
  refs.footerBackdrop.classList.add('is-hidden');
  refs.game.classList.add('visually-hidden');
  refs.modalContent.classList.remove('visually-hidden');
  clearListeners();
}

function closeFooterModal(evt) {
  if (evt.target === refs.footerBackdrop || evt.code === 'Escape') {
    refs.footerBackdrop.classList.add('is-hidden');

    clearListeners();
  }
}

function clearListeners() {
  document.removeEventListener('keydown', closeFooterModal);
  refs.footerBackdrop.removeEventListener('click', closeFooterModal);
  refs.footerCloseBtn.removeEventListener('click', footerModalHidden);
  // document.querySelector('body').classList.remove('noScroll');
  document.body.style.overflow = 'visible';
}
