const footerCloseBtn = document.querySelector('[data-modal-close]');
const footerBackdrop = document.querySelector('.footer__backdrop');
const footerLink = document.querySelector('footer__link');


export function onFooterModal(){
    footerBackdrop.classList.remove('is-hidden');
    document.querySelector('body').classList.add('noScroll');
    document.addEventListener('keydown', closeFooterModal);
    footerBackdrop.addEventListener('click', closeFooterModal);
    footerCloseBtn.addEventListener('click', footerModalHidden);
}

function footerModalHidden(){
footerBackdrop.classList.add('is-hidden');
clearListeners();
}

function closeFooterModal(evt){
    if (evt.key === 'Escape' || evt.target === footerBackdrop){
        footerBackdrop.classList.add('is-hidden');
        clearListeners();
    }
}

function clearListeners(){
    document.removeEventListener('keydown', closeFooterModal);
    footerBackdrop.removeEventListener('click', closeFooterModal);
    footerCloseBtn.removeEventListener('click', footerModalHidden);
    document.querySelector('body').classList.remove('noScroll');
}