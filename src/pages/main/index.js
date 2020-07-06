import "./index.css";

import Popup from "../../js/components/Popup";
import Header from "../../js/components/Header";
import Burger from "../../js/components/Burger";
import Form from "../../js/components/Form";
import NewsApi from "../../js/api/NewsApi";
import MainApi from "../../js/api/MainApi";
import NewsCardList from "../../js/components/NewsCardList";
import NEWS_API_CONFIG from "../../js/constants/newsApiConfig";
import MAIN_API_CONFIG from "../../js/constants/mainApiConfig";
import NewsCard from "../../js/components/NewsCard";

const props = {
  theme: 'light',
  focus: 0,
  userName: '',
  isLoggedIn: false
};
let isLogged = props.isLoggedIn;
const cards = {
  classCopy: [],
  foundedNews: [],
  savedNews: []
};

let found = cards.foundedNews;
let saved = cards.savedNews;
const popup = document.querySelector('.popup');
const popupSignUp = document.getElementById('popupSignUp');
const popupLogIn = document.getElementById('popupLogin');
const searchContainer = document.querySelector('.results');
const cardListContainer = searchContainer.children[1];

const form = new Form();
const burger = new Burger();
const header = new Header(props);
const newsApi = new NewsApi(NEWS_API_CONFIG);
const mainApi = new MainApi(MAIN_API_CONFIG);
const newsCardList = new NewsCardList(searchContainer, cardListContainer);
const signUpPopup = new Popup(popup, popupSignUp);
const logInPopup = new Popup(popup, popupLogIn);
const newsCard = new NewsCard();

const submit = () => {
  event.preventDefault();
  const keyword = form.setKeyword();
  newsCardList._renderLoader(true);
  newsApi
  .getNews(keyword)
  .then(result => {
    newsApi.parseResults(result, keyword, found);
    newsCardList.renderResults(found);
  })
  .catch((err) => {
    newsCardList._error(true, error);
    console.log(err)
  });
}
const logInPopupFunc = () => {
  logInPopup.close(event);
  signUpPopup.open(event);
}
const signUpPopupFunc = () => {
  signUpPopup.close(event);
  logInPopup.open(event);
}
const showMore = () => {
  newsCardList.showMoreFunc();
}
const markBtn = (event) => {
  newsCard.markUnmark(event);
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('header__btn_login')
      ||
      event.target.classList.contains('popup__link_reg_btn')) {
        logInPopupFunc()
  }
  if (event.target.classList.contains('popup__link_log_btn')) {
        signUpPopupFunc()
  }
  if (event.target.classList.contains('search-form__button')) {
        submit();
  }
  if (event.target.classList.contains('results__btn-more')) {
    showMore();
  }
  if (event.target.closest('.bookmark__icon')) {
    markBtn(event);
  }
  form.render();
  burger.openClose(event);
});

header.render();


