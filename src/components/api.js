const cohortId = 'wff-cohort-42';
const apiToken = '6ac072b8-907a-4352-86ed-4f38c01485f9';
const PATH = 'https://nomoreparties.co/v1/'

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function getUserProfile() {
  return fetch(`${PATH}${cohortId}/users/me`, {
    method: "GET",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json"
    },
  }).then(checkResponse);
}

export function getCards() {
  return fetch(`${PATH}${cohortId}/cards`, {
    method: "GET",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json"
    },
  }).then(checkResponse);
}

export function editProfile(nameUser, aboutUser) {
  return fetch(`${PATH}${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    name: nameUser,
    about: aboutUser
  })

  }).then(checkResponse);
}

export function addCard(nameCard, linkCard) {
  return fetch(`${PATH}${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    name: nameCard,
    link: linkCard
  })

  }).then(checkResponse);
}