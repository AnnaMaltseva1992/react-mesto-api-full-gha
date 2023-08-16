class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }

  _prepareResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInformation() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._prepareResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._prepareResponse);
  }

  editProfile(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then(this._prepareResponse);
  }

  addNewCard(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data.place, link: data.link }),
    }).then(this._prepareResponse);
  }

  deleteCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._prepareResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._prepareResponse);
  }

  editAvatar(avatar) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatar),
    }).then(this._prepareResponse);
  }
}

const api = new Api({
  baseUrl: "https://annamaltsevaback.nomoredomains.work",
});

export { api };