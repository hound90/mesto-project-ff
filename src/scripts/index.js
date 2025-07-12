import '../pages/index.css';

import { createCard, deleteCard, handleCardLike } from '../components/card.js';
import { openModal, closeModal, addPopupListener } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validate.js';
import { getUserProfile, getCards, editProfile, addCard } from '../components/api.js';

const cardList = document.querySelector('.places__list');

// Кнопка и попап редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description'); 
const profileImage = document.querySelector('.profile__image');
const editProfileSubmit = popupEdit .querySelector('.popup__button');

// Форма попапа редактирования профиля

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// Кнопка добавления и открытие попап изображения
const addImageButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const zoomImage = popupImage.querySelector('.popup__image');
const captionImage = popupImage.querySelector('.popup__caption');
const editCardSubmit = popupNewCard .querySelector('.popup__button');

// Форма попапа добавления карточки
const formElementCard = document.forms['new-place'];
const cardNameInput = formElementCard.elements['place-name'];
const cardLinkInput = formElementCard.elements.link;


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// Коллбэки
const cardCallbacks = {
   cardRemove: deleteCard,
   openImage: handleOpenImage,
   cardLike: handleCardLike,
};


Promise.all([ getUserProfile(), getCards() ])
.then(( [ user, cards ]) => {
   profileTitle.textContent = user.name
   profileDescription.textContent = user.about
   profileImage.style['background-image'] = `url(${user.avatar})`
   if (!Array.isArray(cards)) {
      console.error(`${cards} не является массивом`);
      return;
   }
   cards.forEach((item) => {
      const card = createCard(item, cardCallbacks);
      cardList.append(card);
   })
   
})

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
}




// Открытие попапа профиля
editProfileButton.addEventListener('click', () => {
   nameInput.value = profileTitle.textContent;
   jobInput.value = profileDescription.textContent;
   clearValidation(popupEdit, validationConfig);
   openModal(popupEdit);
});
// Открытие попапа добавления изображений
addImageButton.addEventListener('click', () => {
   clearValidation(popupNewCard, validationConfig);
   formElementCard.reset();
   openModal(popupNewCard);
});

// Слушатели для всех попапов
addPopupListener(popupEdit);
addPopupListener(popupNewCard);
addPopupListener(popupImage);

// Открытие попапа карточки
function handleOpenImage({ name, link }) {
   zoomImage.src = link;
   zoomImage.alt = name;
   captionImage.textContent = name;
   openModal(popupImage);
}

// Редактирование профиля
function handleFormSubmit(evt) {
   evt.preventDefault();
   
   renderLoading(true, editProfileSubmit)
   editProfile(nameInput.value, jobInput.value).then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
   })
   .finally(() => {renderLoading(false, editProfileSubmit)})
}
 formElement.addEventListener('submit', handleFormSubmit); 



// Добавление новой карточки
function handleAddNewCardSubmit(evt) {
   evt.preventDefault();
   renderLoading(true, editCardSubmit)
   addCard(cardNameInput.value, cardLinkInput.value).then((cardObject) => {
      const cardElement = createCard(cardObject, cardCallbacks)
      cardList.prepend(cardElement);
      formElementCard.reset();
      closeModal(popupNewCard);
   })
   .finally(() => {renderLoading(false, editCardSubmit)})
   
}
 formElementCard.addEventListener('submit', handleAddNewCardSubmit);






enableValidation(validationConfig);

