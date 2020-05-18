import "./index.css";

import Popup from "../../blocks/popup/popup";
import Header from "../../blocks/header/header";

const signUp = document.getElementById('popupSignUp');
const logIn = document.getElementById('popupLogin');
const burger = document.querySelector('.header__burger');

const signUpPopup = new Popup(signUp);
const logInPopup = new Popup(logIn);
const burgerMenu = new Header(burger);

const root = document.querySelector('.root');

root.addEventListener('click', () => {
  logInPopup.show(event);
  burgerMenu.toggle(event);
  });

root.addEventListener('click', () => {
  signUpPopup.hide(event);
  logInPopup.hide(event);
  });;

$('.bookmark__icon').click(function(e) {
  e.preventDefault;
  $('.bookmark__icon_color').toggleClass('bookmark__icon_saved');
});
