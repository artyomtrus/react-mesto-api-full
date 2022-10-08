class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._authBaseUrl = config.authBaseUrl;
    this._authHeaders = config.authHeaders;
    this._getResponseData = this._getResponseData.bind(this);
  }

  getCards() {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getUserId() {
    return fetch(`${this._baseUrl}/v1/cohort-44/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setUserId(data) {
    return fetch(`${this._baseUrl}/v1/cohort-44/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setLikeStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._baseUrl}/v1/cohort-44/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  }

  createNewAvatar(data) {
    return fetch(`${this._baseUrl}/v1/cohort-44/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData);
  }

  registration(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._authHeaders,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._getResponseData);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._authHeaders,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  }

  getContent(token) {
    return fetch(`${this._authBaseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const api = new Api({
  baseUrl: "https://artyom.trus.nomoredomains.icu",
  headers: {
    authorization: "22b5d3c1-15e9-4089-aa4a-7712649273a9",
    "Content-Type": "application/json",
  },
  authBaseUrl: "https://api.artyom.trus.nomoredomains.icu",
  authHeaders: { "Content-Type": "application/json" },
});

export default api;
