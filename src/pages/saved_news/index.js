import "./index.css";

$('.header__burger').click(function(e) {
  e.preventDefault;
  $(this).toggleClass('header__burger_is-active');
});

$('.header__burger').click(function(e) {
  e.preventDefault;
  $('.header__menu').toggleClass('header__menu_show');
});