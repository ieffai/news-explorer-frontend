export default class MainApi {
  constructor(config) {
    this.config = config;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  createUser(options) {
    const { email, password, name } = options;
    return fetch(`${this.config.URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
    .then(this._getResponse);
  }

  login(options) {
    const { email, password } = options;
    return fetch(`${this.config.URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(this._getResponse);
  }

  getUser() {
    return fetch(`${this.config.URL}/users/me`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(this._getResponse);
  }

  getArticles() {
    return fetch(`${this.config.URL}/articles`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(this._getResponse);
  }

  createArticle({ keyword, title, text, date, source, link, image }) {
    return fetch(`${this.config.URL}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image
      })
    })
    .then(this._getResponse);
  }

  delArticle(articleId) {
    return fetch(`${this.config.URL}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(this._getResponse);
  }
}
