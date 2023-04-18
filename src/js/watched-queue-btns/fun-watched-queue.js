// 💙💛 Koshyk Kostiantyn

// функция добавляяет в Local Storage
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error.message);
  }
}

// функция читает из Local Storage
function loadFromLocalStorage(key) {
  try {
    return null ? undefined : JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Hi', error.message);
  }
}

// функция переименовывает кнопку
function renameBtnTextCont(btn, nameBtn) {
  btn.textContent = nameBtn;
}

// содает пустой массив в Local Storage, если такой отсутствует
function createArrayLocalStorage(key) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, '[]');
  }
}
// Удаляет пустой массив в LocalStorage, если он пуст
function removeLocalStorage(key) {
  if (localStorage.getItem(key) === '[]') {
    localStorage.removeItem(key);
  }
}

// функция изменяет название кнопки
function renameBtn(btn, key, nameA, nameB, id) {
  if (!loadFromLocalStorage(key).find(el => el.id === Number(id))) {
    btn.textContent = nameA;
    btn.classList.remove('active-btn');
  } else {
    btn.textContent = nameB;
    btn.classList.add('active-btn');
  }
}

export {
  saveToLocalStorage,
  loadFromLocalStorage,
  renameBtnTextCont,
  renameBtn,
  createArrayLocalStorage,
  removeLocalStorage,
};
