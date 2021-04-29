import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(container, popupName) {
    super();
    this.container = container;
    this.popupName = popupName;
    this.close = this.close.bind(this);
    this.outClose = this._outClose.bind(this);
    this.escClose = this._escClose.bind(this);
  }

  open() {
    this._clearContent();
    this._setContent();
    this.container.classList.add('popup_show');
  }

  _setContent() {
    this.container.appendChild(this.popupName.cloneNode(true).content);
    this.popupClose = this.container.querySelector('.popup__close');
    this._addListeners();
  }

  _clearContent() {
    const createdPopup = this.container.children[0];
    if (createdPopup) {
      this.removeHandlers();
      this.container.removeChild(createdPopup);
    }
  }

  close() {
    this.container.classList.remove('popup_show');
    this._clearContent();
  }

  _escClose(event) {
    const keyResult = event.which;
    if (keyResult === 27) {
      this.close();
    }
  }

  _outClose(event) {
    if (event.target.classList.contains('popup_show')) {
      this.close();
    }
  }

  _addListeners() {
    this.setHandlers(
      [
        {
          element: this.popupClose,
          event: 'click',
          callback: this.close,
        },
        {
          element: document,
          event: 'keydown',
          callback: this.escClose,
        },
        {
          element: document,
          event: 'mousedown',
          callback: this.outClose,
        },
      ],
    );
  }
}
