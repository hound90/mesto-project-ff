
export function createCard (cardObject, userID, { cardRemove, openImage, cardLike }) {
  const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  const buttonDelete = cardElement .querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card_like_counter');

  cardElement.querySelector('.card__title').textContent = cardObject.name;
  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
   // ------------------------------------------------------------------------
  const isLiked = cardObject.likes.some((user) => user._id === userID);
  if (isLiked) {likeButton.classList.add('card__like-button_is-active')}
  likeCountElement.textContent = cardObject.likes.length;

  likeButton.addEventListener('click', () => {cardLike(cardObject._id, likeButton, likeCountElement)});
  // ------------------------------------------------------------------------
  cardImage.addEventListener('click', () => {openImage(cardObject)});
  // ------------------------------------------------------------------------
  if (cardObject.owner._id === userID) {
  buttonDelete.addEventListener('click', () => {cardRemove(cardObject._id, cardElement)})
  } else {buttonDelete.remove()}
  // ------------------------------------------------------------------------
  return cardElement;
}



