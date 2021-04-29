import './index.css';

import Popup from '../../js/components/Popup';
import Header from '../../js/components/Header';
import Burger from '../../js/components/Burger';
import Form from '../../js/components/Form';
import NewsApi from '../../js/api/NewsApi';
import MainApi from '../../js/api/MainApi';
import NewsCardList from '../../js/components/NewsCardList';
import NEWS_API_CONFIG from '../../js/constants/newsApiConfig';
import MAIN_API_CONFIG from '../../js/constants/mainApiConfig';
import NewsCard from '../../js/components/NewsCard';

import constants from '../../js/constants/constants';

const {
  COOKIE_NAME_USER,
  COOKIE_NAME_LOGIN,
} = constants;

const props = {
  theme: 'light',
  focus: 0,
  isLoggedIn: null,
  isMain: true,
  user: {},
};

const cards = {
  foundedNews: [],
  savedNews: [],
};

const found = cards.foundedNews;
const saved = cards.savedNews;
const popup = document.querySelector('.popup');
const popupSignUp = document.getElementById('popupSignUp');
const popupLogIn = document.getElementById('popupLogin');
const popupSuccess = document.getElementById('popupSuccess');
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
const successPopup = new Popup(popup, popupSuccess);
const newsCard = new NewsCard();

const submit = () => {
  event.preventDefault();
  const keyword = form.setKeyword();
  newsCardList._renderLoader(true);
  newsApi
    .getNews(keyword)
    .then((result) => {
      newsApi.parseResults(result, keyword, found, props.isLoggedIn, saved);
      newsCardList.renderResults(found);
    })
    .catch((err) => {
      newsCardList._error(true, err);
    });
};
const logInPopupFunc = () => {
  logInPopup.close(event);
  signUpPopup.open(event);
};
const signUpPopupFunc = () => {
  signUpPopup.close(event);
  logInPopup.open(event);
};
const successPopupFunc = () => {
  signUpPopup.close(event);
  successPopup.open(event);
};
const showMore = () => {
  newsCardList.showMoreFunc();
};
const signUp = (event) => {
  event.preventDefault();
  const signupForm = document.querySelector('.popup__body');
  const userData = form.getFormData(signupForm);
  mainApi
    .createUser(userData)
    .then(() => successPopupFunc())
    .catch((err) => form.serverError(err));
};
const render = () => {
  if (mainApi.getCookie(COOKIE_NAME_LOGIN)) {
    props.user = mainApi.getCookie(COOKIE_NAME_USER);
    props.isLoggedIn = mainApi.getCookie(COOKIE_NAME_LOGIN);
  }
  header.render();
  props.isLoggedIn ? header.getUserName(mainApi.getUser()) : ''
};
const logIn = (event) => {
  event.preventDefault();
  const signinForm = document.querySelector('.popup__body');
  const userData = form.getFormData(signinForm);
  mainApi
    .login(userData)
    .then((res) => {
      props.user = mainApi.setCookie(COOKIE_NAME_USER, res.name);
      props.isLoggedIn = mainApi.setCookie(COOKIE_NAME_LOGIN, true);
      header.renderLinks();
      header.getUserName(mainApi.getUser());
      logInPopup.close();
    })
    .catch((err) => form.serverError(err));
};
const logOut = () => {
  mainApi.deleteCookie(COOKIE_NAME_USER);
  mainApi.deleteCookie(COOKIE_NAME_LOGIN);
  props.isLoggedIn = false;
  document.location.href = '/';
  header.renderLinks();
};
const saveCard = (element) => {
  const container = element.closest('.results__card');
  const cardData = newsCard.getCardData(container);
  mainApi.createArticle(cardData)
    .then((res) => {
      container.setAttribute('_id', res._id);
      newsCard.markUnmark(element);
    })
    .catch((err) => {
      console.log(err);
    });
};
const delCard = (element) => {
  const container = element.closest('.results__card');
  const articleId = container.getAttribute('_id');
  mainApi.delArticle(articleId)
    .then(() => {
      container.removeAttribute('_id');
      newsCard.markUnmark(element);
    })
    .catch((err) => {
      console.log(err);
    });
};
const tipControl = (element) => {
  const tip = element.nextElementSibling;
  newsCard.toggleTip(tip, props.isLoggedIn);
};
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('header__btn_login')
      || event.target.classList.contains('popup__link_reg_btn')) {
    logInPopupFunc();
  }
  if (event.target.classList.contains('popup__link_log_btn')) {
    signUpPopupFunc();
  }
  if (event.target.classList.contains('search-form__button')) {
    submit();
  }
  if (event.target.classList.contains('results__btn-more')) {
    showMore();
  }
  if (event.target.closest('.bookmark__icon')) {
    if (event.target.classList.contains('bookmark__icon_marked')) {
      delCard(event.target);
    } else {
      saveCard(event.target);
    }
  }
  if (event.target.classList.contains('popup__btn')) {
    if (event.target.id === 'signSubmit') {
      signUp(event);
    } else {
      logIn(event);
    }
  }
  if (event.target.classList.contains('header__btn_exit')) {
    logOut();
  }

  form.render();
  burger.openClose(event);
});
document.addEventListener('mouseover', (event) => {
  if (event.target.closest('.bookmark__icon')) {
    tipControl(event.target);
  }
});

render();
