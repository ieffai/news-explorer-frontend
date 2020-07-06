import BaseComponent from "./BaseComponent";

export default class Burger extends BaseComponent {
  constructor () {
    super();
    this.burger = document.querySelector('.header__burger');
  }

  openClose(event) {
    const headerMenu = document.querySelector('.header__menu');
    if(event.target.closest('.header__burger')){
      this.burger.classList.toggle('header__burger_is-active');
      headerMenu.classList.toggle('header__menu_show');
    }
    if(event.target.classList.contains('header__menu')){
      this.burger.classList.remove('header__burger_is-active');
      headerMenu.classList.remove('header__menu_show');
    }
  }

}