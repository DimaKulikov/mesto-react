class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.deleteLike = this.deleteLike.bind(this);
    this.putLike = this.putLike.bind(this)
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка запроса на сервер ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => this._parseResponse(res))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => this._parseResponse(res))
  }

  updateUserInfo(newInfo) {
    return fetch(this._baseUrl + '/users/me', {
      headers: { ...this._headers, 'content-type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(newInfo)
    })
      .then(res => this._parseResponse(res))
  }

  addCard(newCard) {
    return fetch(this._baseUrl + '/cards', {
      headers: { ...this._headers, 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newCard)
    })
      .then(res => this._parseResponse(res))
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
  }

  putLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(res => this._parseResponse(res))
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
  }

  changeCardLikeStatus(cardId, isCurrentlyLiked) {
    return isCurrentlyLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: { ...this._headers, 'content-type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(avatar)
    })
      .then(res => this._parseResponse(res))
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'a6be0e39-3b40-440d-b51a-2e6c0105cc3c'
  }
})

export default api