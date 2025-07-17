const cohortId = 'wff-cohort-42';
const apiToken = '6ac072b8-907a-4352-86ed-4f38c01485f9';
const PATH = 'https://nomoreparties.co/v1/'
const headers = {
      authorization: apiToken,
      "Content-Type": "application/json"
    }

//Преобразование и проверка на ошибку
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then(
      (error) => {
        error.httpStatusCode = res.status;
        return Promise.reject(error);
      }
    );
}

//Получаем данные профиля
export function getUserProfile() {
  return fetch(`${PATH}${cohortId}/users/me`, {
    method: "GET",
    headers: headers,
  }).then(checkResponse);
}


//Получаем карточки
export function getCards() {
  return fetch(`${PATH}${cohortId}/cards`, {
    method: "GET",
    headers: headers,
  }).then(checkResponse);
}

//Отправляем запрос на изменения профиля по номеру ID
export function editProfile(nameUser, aboutUser) {
  return fetch(`${PATH}${cohortId}/users/me`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
    name: nameUser,
    about: aboutUser
  })

  }).then(checkResponse);
}

//Добавляем карточку 
export function addCard(nameCard, linkCard) {
  return fetch(`${PATH}${cohortId}/cards`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
    name: nameCard,
    link: linkCard
  })

  }).then(checkResponse);
}

//Поставить/удалить лайк
export function toggleLike (cardID, isLiked) {
  const endpoint = `${PATH}${cohortId}/cards/likes/${cardID}`;
  const fetchOptions = {
    headers: headers,
    method: isLiked ? 'DELETE' : 'PUT',
  };
  return fetch(endpoint, fetchOptions).then(checkResponse);
}

//Удаление карточки
export function deleteCard(cardID) {
  return fetch (`${PATH}${cohortId}/cards/${cardID}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}

//Изменение аватарки
export function updateAvatar(updateAvatarLink) {
  return fetch(`${PATH}${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ avatar: updateAvatarLink }),
  }).then(checkResponse);
}