export default class BaseComponent {
  constructor() {
    this.events = [];
  }

  setHandlers(listeners) {
    listeners.forEach((listener) => {
      this._addListener(listener);
      this.events.push(listener);
    });
  }

  _addListener({ element, event, callback }) {
    element.addEventListener(event, callback);
  }

  removeHandlers() {
    this.events.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.events = [];
  }
}
