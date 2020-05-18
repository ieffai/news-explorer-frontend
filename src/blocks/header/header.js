import Component from "../component";

import './header.css';

export default class Header extends Component {
  constructor (...args) {
    super(...args);

    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    const a = document.querySelector('.header__menu');

    if(event.target.closest('.header__burger')){
      this.domElement.classList.toggle('header__burger_is-active');
      a.classList.toggle('header__menu_show');
    }
    // if(event.target.closest('#headerLoginBtn')){
    //   this.domElement.classList.toggle('header__burger_is-active');
    //   a.classList.toggle('header__menu_show');
    // }

  }

}