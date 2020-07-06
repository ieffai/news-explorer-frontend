import BaseComponent from "./BaseComponent";
import Template from "./Template";
import constants from "../constants/constants";

const template = new Template();
const { NO_RESULTS,
        DEFAULT_ERROR,
        ALLOWED_AMOUNT, } = constants;

export default class NewsCardList extends BaseComponent {
  constructor(searchContainer) {
    super();
    this.searchContainer = searchContainer;
    this.newsCards = [];
  }

  _clearContent() {
    const content = this.searchContainer.children;
    if (content) {
      Array.from(content).forEach(child => {
        child.remove();
      });
    }
  }

  _clearCardList(renderedCards) {
      let i = 0;
      while (i < renderedCards.length) {
        renderedCards.splice(i, 1);
        }
      return renderedCards
  }

  _setContent(element, position) {
    this.searchContainer.classList.add('visible');
    this.searchContainer.insertAdjacentHTML(position, element);
  }

  _renderLoader(isActive) {
    if (isActive) {
      this._clearContent();
      this._setContent(template.preloader(), 'afterbegin');
    }
  }

  _error(isActive, error){
    this._clearContent();
    if (isActive && error) {
      this._setContent(template.noResults(DEFAULT_ERROR), 'beforeend');
    } else {
      this._setContent(template.noResults(NO_RESULTS), 'beforeend');
    }
  }

  showMoreFunc() {
    const cardList = this.searchContainer.lastChild.previousElementSibling;
    const cardListLength = cardList.children.length;
    this.newsCards.forEach((article, amount) => {
      if (amount < cardListLength + ALLOWED_AMOUNT) {
        cardList.appendChild(article);
      }
    });
    if (this.newsCards.length - cardListLength <= 3) {
      cardList.parentNode.lastChild.remove();
    }

  }

  _renderNews (articles, container) {
    articles.forEach((article, amount) => {
      if (amount < ALLOWED_AMOUNT) {
        container.appendChild(article);
      }
      this.newsCards.push(article);
    });
    if (articles.length > ALLOWED_AMOUNT) {
      this._setContent(template.showMore(), 'beforeend');
    }
  }

  renderResults(articles) {
    setTimeout(this._clearContent(), 50000);
    this._clearCardList(this.newsCards);
    if (!articles.length) {
      this._error(true);
    } else {
      this._setContent(template.cardList(), 'afterbegin');
      const cardList = this.searchContainer.lastChild.previousElementSibling;
      this._renderNews(articles, cardList)
      this._clearCardList(articles);
    }
  }
}
