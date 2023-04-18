// ------------------------Динамічне позиціонування кнопок у модалці -------------------------------

export const positionBtnsContainer = () => {
    const movieModalContainer = document.querySelector(".modal-movie"); // модалка
    const div = document.querySelector('.modal-movie__container'); // контейнер для текстового змісту модалки  
    const btnsWrap = document.querySelector('.modal-movie__command-btns-wrap');  //контейнер для кнопок
    
    // Динамічне обчислення padding-top модалки
    const modalStyles = window.getComputedStyle(movieModalContainer);
    const ModalPaddingTop = Number.parseFloat(modalStyles.paddingTop); // чистий padding-top модалки без 'px'
    const ModalPaddingRight = Number.parseFloat(modalStyles.paddingRight); // чистий padding-right модалки без 'px'
    
    //Динамічне обчислення width блоку з кнопками (<div>)
    const btnsWrapStyles = window.getComputedStyle(btnsWrap);
    dinamicWidthOfBtnsWrap = Number.parseFloat(btnsWrapStyles.width);
    
    // Динамічне обчислення height і width текстового змісту модалки <div>
    const divStyles = window.getComputedStyle(div);
    dinamicTopCoordinateForBtns = Number.parseFloat(divStyles.height) + ModalPaddingTop + 20 + 'px';  // верхня координата
    dinamicRightCoordinateForBtns = (Number.parseFloat(divStyles.width) + ModalPaddingRight) - dinamicWidthOfBtnsWrap + 'px';  // права координата    
    
    btnsWrap.style.top = dinamicTopCoordinateForBtns;  // задали кнопці верхню координату
    btnsWrap.style.right = dinamicRightCoordinateForBtns;  // задали кнопці праву координату
    }