import '../pages/index.css';
import { createCard } from '../components/card.js';
import { openModal, closeModal, addPopupListener } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validate.js';
import { getUserProfile, getCards, editProfile, addCard, toggleLike, deleteCard, updateAvatar } from '../components/api.js';

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
const editCardSubmit = popupNewCard.querySelector('.popup__button');
// Форма попапа подтверждения удаления карточки
const popupConfirmationDelete = document.querySelector('.popup_confirmation_delete')
const formConfirmation = document.forms.confirmation;
const buttonDeleteConfirmation = popupConfirmationDelete.querySelector('.popup__button');


// Форма попапа добавления карточки
const formElementCard = document.forms['new-place'];
const cardNameInput = formElementCard.elements['place-name'];
const cardLinkInput = formElementCard.elements.link;

// Форма попапа изменения аватарки
const avatarPopup = document.querySelector('.popup_avatar_edit');
const avatarForm = document.forms['edit_avatar'];
const avatarSubmitButton = avatarForm.querySelector(".popup__button");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");


const validationConfig = {
  formSelector: '.popup__form' ,
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

let userId
let cardForDelete = {}


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
// Открытие попапа карточки
function handleOpenImage({ name, link }) {
   zoomImage.src = link;
   zoomImage.alt = name;
   captionImage.textContent = name;
   openModal(popupImage);
}

// Открытие попапа изменения аватарки
profileImage.addEventListener("click", () => {
   clearValidation(avatarPopup, validationConfig);
   avatarForm.reset();
   openModal(avatarPopup);
});

// Включение валидации
enableValidation(validationConfig);
// ------------------------------------------------------------------------

// Слушатели для всех попапов
addPopupListener(popupEdit);
addPopupListener(popupNewCard);
addPopupListener(popupImage);
addPopupListener(popupConfirmationDelete);
addPopupListener(avatarPopup);
// ------------------------------------------------------------------------


// Лоадер
function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
}
// ------------------------------------------------------------------------



// Редактирование профиля
function handleFormSubmit(evt) {
   evt.preventDefault();
   
   renderLoading(true, editProfileSubmit)
   editProfile(nameInput.value, jobInput.value).then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
   })
   .catch((err) => {
      console.error(`Ошибка редактирования профиля: ${err}`);
    })

   .finally(() => {renderLoading(false, editProfileSubmit)})
}
 formElement.addEventListener('submit', handleFormSubmit); 


// Добавление новой карточки
function handleAddNewCardSubmit(evt) {
   evt.preventDefault();
   renderLoading(true, editCardSubmit)
   addCard(cardNameInput.value, cardLinkInput.value).then((cardObject) => {
      const cardElement = createCard(cardObject, userId, cardCallbacks)
      cardList.prepend(cardElement);
      formElementCard.reset();
      closeModal(popupNewCard);
   })
   .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
   .finally(() => {renderLoading(false, editCardSubmit)})
   
}
 formElementCard.addEventListener('submit', handleAddNewCardSubmit);

// Лайк для карточки
function handleLikeSubmit (cardID, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  
  toggleLike(cardID, isLiked)
    .then((updatedCardData) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      if (likeCountElement) {
        likeCountElement.textContent = updatedCardData.likes.length;
      }
    })
    .catch((err) => {
      console.error(`Ошибка при изменении лайка: ${err}`);
    });
};
// ------------------------------------------------------------------------
//Удаление карточки через модальное окно

const handleDeleteCard = (cardID, cardElement) => {
  cardForDelete = {
    id: cardID,
    cardElement
  }
  
  openModal(popupConfirmationDelete);
};

//Обработчик удаления
const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
  if (!cardForDelete.cardElement) return;
  
  renderLoading(true, buttonDeleteConfirmation);
  
  deleteCard(cardForDelete.id).then(() => {
      cardForDelete.cardElement.remove();
      closeModal(popupConfirmationDelete);
      cardForDelete = {};
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonDeleteConfirmation);
    });
};
console.log(cardForDelete.id)
formConfirmation.addEventListener('submit', handleDeleteCardSubmit);
// ------------------------------------------------------------------------
//Обновление аватара
function handleUpdateAvatarSubmit (evt) {
 evt.preventDefault();

  renderLoading(true, avatarSubmitButton)
  updateAvatar(avatarInput.value).then((res) => {
      profileImage.style['background-image'] = `url(${res.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {renderLoading(false, avatarSubmitButton)})
}

avatarForm.addEventListener("submit", handleUpdateAvatarSubmit);
// ------------------------------------------------------------------------
// Промисы
Promise.all([ getUserProfile(), getCards() ])
.then(( [ user, cards ]) => {
   profileTitle.textContent = user.name
   profileDescription.textContent = user.about
   profileImage.style['background-image'] = `url(${user.avatar})`
   userId = user._id;
   cards.forEach((item) => {
      const card = createCard( item, userId, cardCallbacks );
      cardList.append(card);
   })
})
.catch((err) => {
      console.error(`Ошибка получения данных: ${err}`);
    })
// ------------------------------------------------------------------------
// Коллбэки
const cardCallbacks = {
   cardRemove: handleDeleteCard,
   openImage: handleOpenImage,
   cardLike: handleLikeSubmit,
};
// ------------------------------------------------------------------------
