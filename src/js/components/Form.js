import BaseComponent from './BaseComponent';
import constants from '../constants/constants';

const {
  BAD_NAME,
  BAD_PASSWORD,
  BAD_EMAIL,
  EMPTY_FIELD,
} = constants;

export default class Form extends BaseComponent {
  constructor() {
    super();
    this._validateInput = this._validateInput.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this.form = document.forms.searchForm;
    this.field = this.form.elements.searchField;
    this.popupForm = document.forms.signUpForm;
  }

  _setErrMessage(element, message) {
    element.textContent = message;
  }

  _validateInput(event) {
    const element = event.target;
    const errElement = element.nextElementSibling;

    if (element.name !== 'searchField' && element.validity.valueMissing) {
      this._setErrMessage(errElement, EMPTY_FIELD);
    } else if (element.name === 'searchField' && element.validity.valueMissing) {
      element.placeholder = EMPTY_FIELD;
    } else if (element.type === 'email' && !element.validity.valid) {
      this._setErrMessage(errElement, BAD_EMAIL);
    } else if (element.type === 'password' && !element.validity.valid) {
      this._setErrMessage(errElement, BAD_PASSWORD);
    } else if (element.type === 'text' && !element.validity.valid) {
      if (element.validity.tooShort) {
        this._setErrMessage(errElement, BAD_NAME);
      }
    } else {
      if (element.name !== 'searchField') {
        this._setErrMessage(errElement, '');
      }
    }
  }

  _activeSubmitBtn(btn, isActive) {
    if (isActive) {
      btn.classList.add('btn_active');
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', true);
      btn.classList.remove('btn_active');
    }
  }

  _validateForm(event) {
    const form = event.target.parentNode;
    const btn = form.querySelector('.btn');

    if (!form.checkValidity()) {
      this._activeSubmitBtn(btn, false);
    } else {
      this._activeSubmitBtn(btn, true);
    }
  }

  setKeyword() {
    return this.field.value;
  }

  render() {
    this.setHandlers([
      {
        event: 'input',
        element: document,
        callback: this._validateInput,
      },
      {
        event: 'input',
        element: document,
        callback: this._validateForm,
      },
    ]);
  }

  _setServerError(status, message) {
    const element = document.querySelector('.popup__server-error');
    this._setErrMessage(element, message);
  }

  serverError(error) {
    const { status } = error;
    if (!error.ok) {
      error.text()
        .then((err) => {
          this._setServerError(status, JSON.parse(err).message);
        });
    }
  }

  getFormData(formName) {
    const formValues = {};
    const formData = formName.elements;
    Array.from(formData).forEach((element) => {
      if (element.classList.contains('popup__input')) {
        const valueName = element.name;
        formValues[valueName] = element.value;
      }
    });
    return formValues;
  }
}
