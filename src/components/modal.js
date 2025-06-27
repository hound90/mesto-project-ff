const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  document.addEventListener('keydown', handleEsc);
  modal.classList.add('popup_is-animated');
  setTimeout(() => {
   modal.classList.add('popup_is-opened');
}, 100);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  setTimeout(() => {
   modal.classList.remove('popup_is-animated');
}, 500);
  document.removeEventListener('keydown', handleEsc);
};

export const addPopupListener = (modal) => {
 const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget)
      closeModal(modal);
  });
}
