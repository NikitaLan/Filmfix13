import throttle from 'lodash.throttle';

const upBtn = document.querySelector('[data-up-btn]');

window.addEventListener('scroll', throttle(hideElOnScroll(upBtn), 250));
upBtn.addEventListener('click', toPageTopOnClick);

function hideElOnScroll(el) {
  return function hideOnScroll(e) {
    if (pageYOffset < document.documentElement.clientHeight) {
      el.classList.add('visuallyhidden');
    } else {
      el.classList.remove('visuallyhidden');
    }
  };
}

function toPageTopOnClick(e) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
