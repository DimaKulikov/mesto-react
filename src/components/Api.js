class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.deleteLike = this.deleteLike.bind(this);
    this.putLike = this.putLike.bind(this);
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка запроса на сервер ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
    /**
     * response
     * [
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },
     */
  }
  
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => this._parseResponse(res));
    /**
     * response
     *     {
     *     "name": "Jacques Cousteau",
     *     "about": "Sailor, researcher",
     *     "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
     *     "_id": "e20537ed11237f86bbb20ccb",
     *     "cohort": "cohort0"
     *   } 
  */
  }

  updateUserInfo(newInfo) {
    /**
     * request
     * {
     * name: 'name',
     * about: 'about'
     * }
     * 
     * response
     * {
     *   "name": "Marie Skłodowska Curie",
     *   "about": "Physicist and Chemist",
     *   "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
     *   "_id": "e20537ed11237f86bbb20ccb",
     *   "cohort": "cohort0",
     * } 
     */
    return fetch(this._baseUrl + "/users/me", {
      headers: { ...this._headers, "content-type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(newInfo),
    }).then((res) => this._parseResponse(res));
  }

  addCard(newCard) {
    /**
     * request
     * {
     * name: 'name'
     * link: 'url'
     * }
     * 
     * response 
     *  {
     *     "likes": [],
     *     "_id": "5d1f0611d321eb4bdcd707dd",
     *     "name": "Байкал",
     *     "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
     *     "owner": {
     *       "name": "Jacques Cousteau",
     *       "about": "Sailor, researcher",
     *       "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
     *       "_id": "ef5f7423f7f5e22bef4ad607",
     *       "cohort": "local"
     *     },
     *     "createdAt": "2019-07-05T08:10:57.741Z"
     *   }
     * 
     */
    return fetch(this._baseUrl + "/cards", {
      headers: { ...this._headers, "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(newCard),
    }).then((res) => this._parseResponse(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._parseResponse(res));
  }

  putLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => this._parseResponse(res));
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._parseResponse(res));
  }

  changeCardLikeStatus(cardId, isCurrentlyLiked) {
    return isCurrentlyLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  }

  updateAvatar(avatar) {
    /**
     * request
     * {
     * avatar: 'url'
     * }
     */
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: { ...this._headers, "content-type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(avatar),
    }).then((res) => this._parseResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'a6be0e39-3b40-440d-b51a-2e6c0105cc3c'
  }
})

export default api