export default class Element {
  #element

  constructor(elementType = 'div') {
    this.#element = document.createElement(elementType);
  }

  get element() {
    return this.#element;
  }

  render() {}
}