class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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
    return fetch(this._baseUrl + '/cards')
      .then(res => this._parseResponse(res))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me')
      .then(res => this._parseResponse(res))
  }

  updateUserInfo(newInfo) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify(newInfo)
    })
      .then(res => this._parseResponse(res))
  }

  addCard(newCard) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      body: JSON.stringify(newCard)
    })
      .then(res => this._parseResponse(res))
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
  }

  putLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT'
    })
      .then(res => this._parseResponse(res))
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
  }

  changeCardLikeStatus(cardId, isCurrentlyLiked) {
    return isCurrentlyLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify(avatar)
    })
      .then(res => this._parseResponse(res))
  }
}

const api = new Api({
  baseUrl: 'http://api.mesto.dima.nomoredomains.monster'
})

export default api
