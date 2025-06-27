import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard } from '../components/card.js';
import { openModal, closeModal, addPopupListener } from '../components/modal.js';


const cardList = document.querySelector('.places__list');

// Кнопка и попап редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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

// Форма попапа добавления карточки
const formElementCard = document.forms['new-place'];
const cardNameInput = formElementCard.elements['place-name'];
const cardLinkInput = formElementCard.elements.link;

// Коллбэки
const cardCallbacks = {
   cardRemove: deleteCard,
   openImage: handleOpenImage,
   cardLike: handleCardLike,
};

// Открытие попапа профиля
editProfileButton.addEventListener('click', () => {
   nameInput.value = profileTitle.textContent;
   jobInput.value = profileDescription.textContent;
   openModal(popupEdit);
});
// Открытие попапа изображений
addImageButton.addEventListener('click', () => {
   openModal(popupNewCard);
});

// Слушатели для всех попапов
addPopupListener(popupEdit);
addPopupListener(popupNewCard);
addPopupListener(popupImage);

// Лайк для карточки
function handleCardLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Открытие попапа карточки
function handleOpenImage({ name, link }) {
   zoomImage.src = link;
   zoomImage.alt = name;
   captionImage.textContent = name;
   openModal(popupImage);
}

// Удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Редактирование профиля
function handleFormSubmit(evt) {
   evt.preventDefault();

   profileTitle.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;

   closeModal(popupEdit);
}
 formElement.addEventListener('submit', handleFormSubmit);

// Добавление новой карточки
function handleAddNewCardSubmit(evt) {
   evt.preventDefault();

   const cardObject = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
   }
   cardList.prepend(createCard(cardObject, cardCallbacks));
   formElementCard.reset();
   closeModal(popupNewCard);
}
 formElementCard.addEventListener('submit', handleAddNewCardSubmit);


// Инициализация
initialCards.forEach((item) => {
   const card = createCard(item, cardCallbacks);
   cardList.append(card);
})

