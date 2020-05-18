import "./index.css";

import Popup from "../../blocks/popup/popup";

const signUp = document.getElementById('popupSignUp');
const logIn = document.getElementById('popupLogin');


const signUpPopup = new Popup(signUp);
const logInPopup = new Popup(logIn);

const root = document.querySelector('.root');

root.addEventListener('click', () => {
  logInPopup.show(event);
  });

root.addEventListener('click', () => {
  signUpPopup.hide(event);
  logInPopup.hide(event);
  });;



$('.header__burger').click(function(e) {
  e.preventDefault;
  $(this).toggleClass('header__burger_is-active');
});

$('.header__burger').click(function(e) {
  e.preventDefault;
  $('.header__menu').toggleClass('header__menu_show');
});

$('.bookmark__icon').click(function(e) {
  e.preventDefault;
  $('.bookmark__icon_color').toggleClass('bookmark__icon_saved');
});

  // $( '.bookmark__icon' ).hover(function(){
  //   $('.bookmark__tip' ).css( "display", "flex" );
  //   }, function(){
  //   $('.bookmark__tip' ).css( "display", "none" );
  // });
