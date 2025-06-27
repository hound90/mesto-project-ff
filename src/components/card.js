export const cardTemplate = document.querySelector('#card-template').content;

// Попап открытия изображения

export function createCard (cardObject, { cardRemove, openImage, cardLike }) {
   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
   const buttonDelete = cardElement .querySelector('.card__delete-button');
   const cardImage = cardElement.querySelector('.card__image');
   const likeButton = cardElement.querySelector('.card__like-button');

   cardElement.querySelector('.card__title').textContent = cardObject.name;
   cardImage.src = cardObject.link;
   cardImage.alt = cardObject.name;

   likeButton.addEventListener ('click', () => {cardLike(likeButton)});

   cardImage.addEventListener('click', () => {openImage(cardObject)});

   buttonDelete.addEventListener ('click', () => {cardRemove(cardElement)}); 

   return cardElement;
}








