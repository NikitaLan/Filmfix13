
const refs ={
 footerCloseBtn : document.querySelector("[data-footer-modal-close]"),
 footerOpenBtn: document.querySelector("[data-footer-modal-open]"),
 footerBackdrop : document.querySelector('.footer__backdrop')
 }

refs.footerOpenBtn.addEventListener('click', onFooterModal);


export function onFooterModal(){
   
    refs.footerBackdrop.classList.remove('is-hidden');
    document.querySelector('body').classList.add('noScroll');
    document.addEventListener('keydown', closeFooterModal);
    refs.footerBackdrop.addEventListener('click', closeFooterModal);
    refs.footerCloseBtn.addEventListener('click', footerModalHidden);
}



function footerModalHidden(){
refs.footerBackdrop.classList.add('is-hidden');
clearListeners();
}

function closeFooterModal(evt){
    if (evt.target === refs.footerBackdrop){
        refs.footerBackdrop.classList.add('is-hidden');
        clearListeners();
    }
}

function clearListeners(){
    document.removeEventListener('keydown', closeFooterModal);
    refs.footerBackdrop.removeEventListener('click', closeFooterModal);
    refs.footerCloseBtn.removeEventListener('click', footerModalHidden);
    document.querySelector('body').classList.remove('noScroll');
}