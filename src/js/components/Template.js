import constants from '../constants/constants';

const { LOG_IN, DELETE_FROM_SAVED } = constants;

export default class Template {
  showMore() {
    return `<button class="results__btn-more btn">
              Show more
            </button>`;
  }

  preloader() {
    return `<div class="results__preloader">
              <div class="preloader__icon"></div>
              <span class="preloader__message">Searching...</span>
            </div>`;
  }

  noResults(error) {
    return `<div class="results__no-results">
              <svg width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="43" cy="43" r="36.5" stroke="#D1D2D6"/>
                <path d="M69 69l19.5 19.5M58.328 55.959c-3.667-4.261-9.1-6.96-15.164-6.96-6.063 0-11.496 2.699-15.164 6.96" stroke="#D1D2D6"/>
                <circle cx="55.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
                <circle cx="30.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
              </svg>
              <span class="no-results__error-name">ERROR</span>
              <span class="no-results__error-message">${error}</span>
            </div>`;
  }

  cardList() {
    return `<h2 class="results__title">Search results</h2>
            <div class="results__cardlist"></div>`;
  }

  _keyWord(control) {
    return `<div class="bookmark__keyword ${control}"></div>`;
  }

  card(isSavedPage, isLogged, id) {
    const element = document.createElement('div');
    const flagBtn = `<button class="bookmark__icon"
                    ${isLogged ? '' : 'disabled'}>
                      <svg  width="14" height="19">
                        <path d="M6.382 12.714L1 16.942V1h12v15.942l-5.382-4.228L7 12.228l-.618.486z" stroke-width="2"/>
                      </svg>
                    </button>`;
    const delBtn = `<button class="bookmark__icon">
                      <svg width="17" height="19">
                        <path d="M12 0H6v2H0v2h18V2h-6V0zM2 6v11c0 1.1.9 2 2 2h10a2 2 0 002-2V6h-2v11H4V6H2zm4 0v9h2V6H6zm4 0v9h2V6h-2z" />
                      </svg>
                    </button>`;
    const card = `<article class="results__card" _id="${id}">
    <div class="card__bookmark">
    ${isSavedPage ? delBtn : flagBtn}
    <div class="bookmark__tip">
    ${isLogged ? DELETE_FROM_SAVED : LOG_IN}
    </div>
    ${isSavedPage ? this._keyWord() : this._keyWord('unvisible')}
  </div>
                    <a class="card__link" target="_blanck">
                      <img class="card__image">
                      <div class="card__container">
                        <time class="card__date"></time>
                        <h3 class="card__title"></h3>
                        <p class="card__text"></p>
                        <p class="card__source"></p>
                      </div>
                    </a>
                  </article>`;
    element.insertAdjacentHTML('beforeend', card);
    return element;
  }
}
