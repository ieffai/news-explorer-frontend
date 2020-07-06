import BaseComponent from "./BaseComponent";
import Template from "./Template";
const template = new Template();

export default class NewsCard extends BaseComponent {
  constructor(data) {
    super();
    this.data = data;
    // this.card = null;

  }

  _parseDate(date) {
    const parsedDate = new Date(date);
    return `${parsedDate.toLocaleString('ru', {
      month: 'long',
      day: 'numeric'
    })}, ${parsedDate.getFullYear()}`;
  }

  _setContent(element) {
    const { _id, keyword, title, text, date, source, link, image } = this.data;
    element.querySelector('.results__card').setAttribute('_id', String(_id));
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
    if (event.target.classList.contains('bookmark__icon')) {
    event.target.classList.toggle('bookmark__icon_marked');
    }

  }

  create() {
    const element = template.card();
    this.card = element.firstChild;

    this._setContent(element);
    return this.card;
  }
}