import BaseComponent from './BaseComponent';
import Template from './Template';

const template = new Template();

export default class NewsCard extends BaseComponent {
  constructor(data) {
    super();
    this.data = data;
    this.card = null;
  }

  _parseDate(date) {
    const parsedDate = new Date(date);
    return `${parsedDate.toLocaleString('ru', {
      month: 'long',
      day: 'numeric',
    })}, ${parsedDate.getFullYear()}`;
  }

  _setContent(element) {
    const {
      keyword, title, text, date, source, link, image,
    } = this.data;
    element.querySelector('.bookmark__keyword').textContent = keyword;
    element.querySelector('.card__title').textContent = title;
    element.querySelector('.card__text').textContent = text;
    element.querySelector('.card__date').textContent = this._parseDate(date);
    element.querySelector('.card__date').setAttribute('datetime', date);
    element.querySelector('.card__source').textContent = source;
    element.querySelector('.card__link').setAttribute('href', link);
    element.querySelector('.card__image').setAttribute('src', image);
    element.querySelector('.card__image').setAttribute('alt', title);
  }

  markUnmark(event) {
    if (event.classList.contains('bookmark__icon')) {
      event.classList.toggle('bookmark__icon_marked');
    }
  }

  toggleTip(event, isLogged) {
    event.classList.toggle('visible');
    if (isLogged) {
      event.textContent = 'Сохранить';
    }
  }

  getCardData(element) {
    const article = [];
    article.keyword = element.querySelector('.bookmark__keyword').textContent;
    article.title = element.querySelector('.card__title').textContent;
    article.text = element.querySelector('.card__text').textContent;
    article.date = element.querySelector('.card__date').textContent;
    article.source = element.querySelector('.card__source').textContent;
    article.link = element.querySelector('.card__link').href;
    article.image = element.querySelector('.card__image').getAttribute('src');
    return article;
  }

  create(isSavedPage, isLogged, id) {
    const element = template.card(isSavedPage, isLogged, id);
    this.card = element.firstChild;
    this._setContent(element);
    return this.card;
  }
}
