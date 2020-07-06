import NewsCard from "../components/NewsCard";
export default class NewsApi {
  constructor(options) {
    this.options = options;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getNews(keyword) {
    return fetch(
      `${this.options.URL}/everything?${this.options.WHERE_LOOKING}=${keyword}&language=${
        this.options.LANG}&sortBy=${this.options.SORT_BY}`,
      { headers: {'x-api-key': `${this.options.KEY}`} })
    .then(this._getResponse);
  }

  _articleData(data, keyword, _id) {
    return {
      _id,
      keyword,
      title: data.title,
      text: data.description,
      date: data.publishedAt,
      source: data.source.name,
      link: data.url,
      image: data.urlToImage
    };
  }

  _parseArticleData(article, keyword, _id, foundArticles) {
    const parsedArticle = this._articleData(article, keyword, _id);
    const newsCard = new NewsCard(parsedArticle);
    foundArticles.push(newsCard.create());
  }

  parseResults(result, keyword, foundArticles) {
    const { articles } = result;
    articles.forEach((article, _id) => this._parseArticleData(article, keyword, _id, foundArticles));
  }


}

