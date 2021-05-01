import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(props) {
    super();
    this.props = props;
    this.headerList = document.querySelector('.header__list');
    this.headerMenu = document.querySelector('.header__menu');
  }

  _savedNewsLink(isMainPage) {
    return `<li class="header__list_saved ${isMainPage ? 'header__link_unfocused' : ''}">
              <a href="./saved_news" class="header__link">
                Saved Articles
              </a>
            </li>`;
  }

  _authLink() {
    return `<li class="header__list_signup">
              <button class="header__btn btn header__btn_login">
                Sign In
              </button>
            </li>`;
  }

  _exitLink(isMainPage) {
    return `<li class="header__list_exit">
              <button class="header__btn btn header__btn_exit">
                <span class="btn__text"></span>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10 6H6v12h4v2H6a2 2 0 01-2-2V6a2 2 0 012-2h4v2zm7.586 7l-4.293 4.134 1.414 1.362 6.707-6.459-6.707-6.459-1.414 1.362 4.293 4.134H8V13h9.586z"
                  fill= ${isMainPage ? '#fff' : '#000'}>
                </svg>
              </button>
            </li>`;
  }

  _clearLinks() {
    Array.from(this.headerList.children).forEach((element) => {
      if (!element.classList.contains('header__list_main')) {
        element.remove();
      }
    });
  }

  _addLink(link) {
    this.headerList.insertAdjacentHTML('beforeend', link);
  }

  renderLinks() {
    this._clearLinks();
    if (this.props.isLoggedIn) {
      this._addLink(this._savedNewsLink(this.props.isMain));
      this._addLink(this._exitLink(this.props.isMain));
      this._focusLink(this.props.focus);
    } else {
      this._addLink(this._authLink());
      this._focusLink(this.props.focus);
    }
  }

  _focusLink(link) {
    document
      .querySelectorAll('.header__link')[link].classList.add('header__link_focused');
  }

  _setTheme() {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');

    if (this.props.theme === 'light') {
      header.classList.add('header_theme_light');
      burger.classList.add('header__burger_theme_light');
    } else {
      header.classList.add('header_theme_dark');
      burger.classList.add('header__burger_theme_dark');
    }
  }

  getUserName(callback) {
    const userName = this.headerList.querySelector('.btn__text');
    callback
      .then((res) => {
        userName.textContent = res.name;
      })
      .catch((err) => console.log(err));
  }

  render() {
    this.renderLinks();
    this._setTheme();
  }
}
