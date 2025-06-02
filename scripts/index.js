// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function cardCreate (card, cardDelete) {
   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
   const buttonDelete = cardElement .querySelector('.card__delete-button');

   cardElement.querySelector('.card__title').textContent = card.name;
   cardElement.querySelector('.card__image').src = card.link;
   cardElement.querySelector('.card__image').alt = card.name;

   buttonDelete.addEventListener ('click', () => {cardDelete(cardElement)}); 

   return cardElement;
}

function cardDelete(cardElement) {
   cardElement.remove();
}

initialCards.forEach((item) => {
   const card = cardCreate(item, cardDelete);
   cardList.append(card);
})

 