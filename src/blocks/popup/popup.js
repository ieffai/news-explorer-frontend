import Component from "../component";

import './popup.css';

export default class Popup extends Component {
  constructor (...args) {
    super(...args);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(event) {
    const a = document.getElementById('popupSignUp');
    const b = document.getElementById('popupLogin');

    if(event.target.closest('#headerLoginBtn')){
      this.domElement.classList.add('popup_show');
    }

    if(event.target.closest('#popupSignUpBtn')){
      a.classList.add('popup_show');
      b.classList.remove('popup_show');
    }

    if(event.target.closest('#loginBtn')){
      b.classList.add('popup_show');
      a.classList.remove('popup_show');
    }
  }

  hide(event) {
      if(event.target.classList.contains('popup__close')){
          this.domElement.classList.remove('popup_show');
      }
  }
}
