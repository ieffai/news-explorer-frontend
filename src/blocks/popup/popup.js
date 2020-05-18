import Component from "../component";

import './popup.css';

export default class Popup extends Component {
  constructor (...args) {
  super(...args);

  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);

  }

  show(event) {
      if(event.target.closest('.header__btn')){
          this.domElement.classList.add('popup_show');
      }
  }

  hide(event) {
      if(event.target.classList.contains('popup__close')){
          this.domElement.classList.remove('popup_show');
      }
  }
}
