import "./index.css";

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
