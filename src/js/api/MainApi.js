export default class MainApi {
  constructor(config) {
    this.config = config;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  createUser(options) {
    const { email, password, name } = options;
    return fetch(`${this.config.URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
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
        password,
      }),
    })
      .then(this._getResponse);
  }

  getUser() {
    return fetch(`${this.config.URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._getResponse);
  }

  getArticles() {
    return fetch(`${this.config.URL}/articles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._getResponse);
  }

  createArticle({
    keyword, title, text, date, source, link, image,
  }) {
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
        image,
      }),
    })
      .then(this._getResponse);
  }

  delArticle(articleId) {
    return fetch(`${this.config.URL}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(this._getResponse);
  }

  setCookie(name, value, options) {
    options = {
      'max-age': 3600 * 24 * 7,
      path: '/'
    };
    const keys = Object.keys(options);
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; `;
    keys.forEach(key => {
      cookieString += `${key}=${options[key]}; `;
    });
    document.cookie = cookieString;
    return value;
  }

  getCookie(name) {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/([\\.$?*|{}\\(\\)\\[\\]\\\\\/\+^])/g, '\\$1')}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  deleteCookie(name) {
    this.setCookie(name, '', {
      'max-age': -1
    });
    return null;
  }
}
