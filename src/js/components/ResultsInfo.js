export default class ResultsInfo {
  constructor(props) {
    this.props = props;
    this.container = document.querySelector('.info');
  }

  _sortKeywords(articlesArr) {
    const articles = articlesArr;
    const keywords = [];
    const sorted = [];
    articles.forEach(article => {
      const word = article.keyword;
      keywords.push(word);
    });

    const reduced = keywords.reduce((prevVal, item) => {
      if (!prevVal[item]) {
        prevVal[item] = 1;
      } else {
        prevVal[item] += 1;
      }
      return prevVal;
    }, {});

    Object.keys(reduced).forEach(key => {
      const arr = [key, reduced[key]];
      sorted.push(arr);
    });

    sorted.sort((a, b) => {
      return b[1] - a[1];
    });
    return sorted;
  }

  _parseKeywords(articles) {
    const keywords = this._sortKeywords(articles);
    const keywordsAmount = keywords.length;
    const keywordsLeft = keywordsAmount - 2;
    const keywordsContainer = this.container.querySelector('.info__keywords');
    const keyword1 = keywordsContainer.querySelector('.info__keyword_one');
    const keyword2 = keywordsContainer.querySelector('.info__keyword_two');
    const keyword3 = keywordsContainer.querySelector('.info__keyword_three');

    switch (keywordsAmount) {
      case 0: {
        keywordsContainer.classList.add('unvisible');
        break;
      }
      case 1: {
        keyword1.textContent = keywords[0][0];
        keyword2.textContent = '';
        keyword3.textContent = '';
        break;
      }
      case 2: {
        keyword1.textContent = keywords[0][0];
        keyword2.textContent = keywords[1][0];
        keyword3.textContent = '';
        break;
      }
      case 3: {
        keyword1.textContent = keywords[0][0];
        keyword2.textContent = keywords[1][0];
        keyword3.textContent = `и ${keywords[2][0]}`;
        break;
      }
      default: {
        keyword1.textContent = keywords[0][0];
        keyword2.textContent = keywords[1][0];
        keyword3.textContent = `и ${keywordsLeft} другим`;
      }
    }
  }

  _titleTemplate(amount, name) {
    return `<div class="info__title">
            <span class="info__username">${name}</span>,
            у Вас
            <span class="info__ammount">
            ${amount}
            сохранённ${this._textToAmount(amount)}</span>
            </div>
            <div class="info__keywords">
              По ключевым словам:
                <span class="info__keyword info__keyword_one"></span>,
                <span class="info__keyword info__keyword_two"></span>
                <span class="info__keyword info__keyword_three"></span>
              </div>
            `
  }
  _clearContent() {
    Array.from(this.container.children).forEach((element) => {
      if (!element.classList.contains('info__subtitle')) {
        element.remove();
      }
    });
  }
  _textToAmount (amount) {
    const n = Math.abs(amount) % 100;
    const b = n % 10;

    if (n > 10 && n < 20) {
      return `ых статей`;
    }
    if (b > 1 && b < 5) {
      return `ые статьи`;
    }
    if (b === 1) {
      return `ая статья`;
    }
    return `ых статей`;
  }

  _setContent(element) {
    this.container.insertAdjacentHTML('beforeend', element);
  }

  renderContent(name, articles) {
    this._clearContent();
    articles
    .then((res) => {
      this._setContent(this._titleTemplate(res.data.length, name));
      this._renderKeywords(res.data);
    });
  }

  _renderKeywords(articles) {
    this._parseKeywords(articles);
  }
}
