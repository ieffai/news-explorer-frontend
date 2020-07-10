import './index.css';

import Header from '../../js/components/Header';
import MainApi from '../../js/api/MainApi';
import MAIN_API_CONFIG from '../../js/constants/mainApiConfig';
import NewsCardList from '../../js/components/NewsCardList';
import NewsCard from '../../js/components/NewsCard';
import ResultsInfo from '../../js/components/ResultsInfo';

const props = {
  theme: 'dark',
  focus: 1,
  isLoggedIn: true,
  name: 'asdasd',
  arrLength: '13',
};

const searchContainer = document.querySelector('.results');
const cardListContainer = searchContainer.children[1];

const header = new Header(props);
const mainApi = new MainApi(MAIN_API_CONFIG);

const newsCardList = new NewsCardList(searchContainer, cardListContainer);
const resultsInfo = new ResultsInfo(props);
const savedCards = [];

header.render();
header.renderLinks();
header.getUserName(mainApi.getUser());

const showMore = () => {
  newsCardList.showMoreFunc();
};

const createCard = (article) => {
  const newsCard = new NewsCard(article);
  const id = newsCard.data._id;
  savedCards.push(newsCard.create(true, true, id));
};
const renderInfo = () => {
  mainApi.getUser().then((res) => resultsInfo.renderContent(res.name, document.querySelector('.results__cardlist').children.length));
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
          renderInfo();
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
const logOut = () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
};
mainApi
  .getArticles()
  .then((res) => {
    renderCardList(res);
    newsCardList.renderResults(savedCards);
    renderInfo();
  })
  .catch((err) => {
    console.log(err);
  });

renderInfo();

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
