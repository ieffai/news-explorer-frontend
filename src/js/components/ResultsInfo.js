export default class ResultsInfo {
  constructor(props) {
    this.props = props;
    this.container = document.querySelector('.info');
  }

  _titleTemplate(name, amount) {
    return `<div class="info__title">
            <span class="info__username">${name}</span>,
            у Вас
            <span class="info__ammount">
            ${amount}
            сохранённых статей</span>
            </div>`
  }

  _clearContent() {
    Array.from(this.container.children).forEach(element => {
      if (!element.classList.contains('info__subtitle')) {
        element.remove();
      }
    });
  }

  _keyWordsTemplate() {
    return `<div class="info__keywords">
              По ключевым словам:
                <span class="info__keyword info__keyword_one">Природа</span>,
                <span class="info__keyword info__keyword_two">Тайга</span> и
                <span class="info__keyword info__keyword_three">2 другим</span>
              </div>`
  }

  _setContent(element) {
    this.container.insertAdjacentHTML('beforeend', element);
  }

  renderContent(name, amount) {
    this._clearContent();
    this._setContent(this._titleTemplate(name, amount));
    this._setContent(this._keyWordsTemplate())
  }
}