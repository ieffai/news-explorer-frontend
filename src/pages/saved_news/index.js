import './index.css';

import Header from '../../js/components/Header';
import MainApi from '../../js/api/MainApi';
import MAIN_API_CONFIG from '../../js/constants/mainApiConfig';
import NewsCardList from '../../js/components/NewsCardList';
import NewsCard from '../../js/components/NewsCard';
import ResultsInfo from '../../js/components/ResultsInfo';
import constants from '../../js/constants/constants';

const {
  COOKIE_NAME_USER,
  COOKIE_NAME_LOGIN,
} = constants;

const props = {
  theme: 'dark',
  focus: 1,
  isLoggedIn: true,
  name: {},
};

const searchContainer = document.querySelector('.results');
const header = new Header(props);
const mainApi = new MainApi(MAIN_API_CONFIG);

let userName = {};

const newsCardList = new NewsCardList(searchContainer);
const resultsInfo = new ResultsInfo(props);
const savedCards = [];

const getArticles = () => {
  mainApi
  .getArticles()
  .then((res) => {
    renderCardList(res);
    newsCardList.renderResults(savedCards);
  })
  .then(() => getTitleData())
  .catch((err) => {
    console.log(err);
  });
}

const getTitleData = () => {
  mainApi
  .getUser()
  .then(res => resultsInfo.renderContent(res.name, mainApi.getArticles()));
}

const showMore = () => {
  newsCardList.showMoreFunc();
};

const createCard = (article) => {
  const newsCard = new NewsCard(article);
  const id = newsCard.data._id;
  savedCards.push(newsCard.create(true, true, id));
};

const renderCardList = (res) => {
  res.data.forEach((article) => {
    createCard(article);
  });

  return savedCards;
};

const delCard = (element) => {
  const container = element.closest('.results__card');
  const articleId = container.getAttribute('_id');
  mainApi.delArticle(articleId)
    .then(() => {
      mainApi
        .getArticles()
        .then((res) => {
          renderCardList(res);
          newsCardList.renderResults(savedCards);
          mainApi.getUser().then(res => resultsInfo.renderContent(res.name, mainApi.getArticles()));
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
const logOut = () => {
  mainApi.deleteCookie(COOKIE_NAME_USER);
  mainApi.deleteCookie(COOKIE_NAME_LOGIN);
  document.location.href = '/';
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('results__btn-more')) {
    showMore();
  }
  if (event.target.closest('.bookmark__icon')) {
    delCard(event.target);
  }
  if (event.target.classList.contains('header__btn')) {
    logOut();
  }
});

header.render();
header.renderLinks();
header.getUserName(mainApi.getUser());

getArticles();


