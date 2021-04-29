import NewsCard from '../components/NewsCard';

export default class NewsApi {
  constructor(options) {
    this.options = options;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getNews(keyword) {
    return fetch(
      `${this.options.URL}/everything?${this.options.WHERE_LOOKING}=${keyword}&language=${
        this.options.LANG}&sortBy=${this.options.SORT_BY}&apiKey=${this.options.KEY}`,
      // { headers: { 'x-api-key': `${this.options.KEY}` } },
    )
      .then(this._getResponse);
  }

  _articleData(data, keyword) {
    return {
      keyword,
      title: data.title,
      text: data.description,
      date: data.publishedAt,
      source: data.source.name,
      link: data.url,
      image: data.urlToImage,
    };
  }

  _getMarkedNews(article, list) {
    for (let i = 0; i < list.length; i += 1) {
      if (article.title.startsWith(list[i].title.substring(0, 20))) {
        return true;
      }
    }
    return false;
  }

  _parseArticleData(article, keyword, foundArticles, isLoggedIn) {
    const parsedArticle = this._articleData(article, keyword);
    const newsCard = new NewsCard(parsedArticle);
    foundArticles.push(newsCard.create(false, isLoggedIn));
  }

  parseResults(result, keyword, foundArticles, isLoggedIn, savedArticles) {
    const { articles } = result;
    articles.forEach((article) => this._parseArticleData(
      article,
      keyword,
      foundArticles,
      isLoggedIn,
      savedArticles,
    ));
  }
}
