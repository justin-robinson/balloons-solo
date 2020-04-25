'use strict';
import Element from './element.js';

export default class Balloon extends Element {
  static balloonEnums;
  color
  height
  imgSrc
  width

  constructor(color, imgSrc, width, height) {
    super();
    this.color = color;
    this.height = height;
    this.width = width;
    this.imgSrc = imgSrc;
  }

  render() {
    this.element.classList.add('balloon');
    const imageContainer = document.createElement('div');
    imageContainer.style.width = this.width;
    imageContainer.style.height = this.height;
    imageContainer.style['background-image'] = `url("${this.imgSrc}")`;
    imageContainer.classList.add('container');
    this.element.appendChild(imageContainer);
  }

  static async loadBalloonEnums() {
    const result = await fetch('/api/balloons.json');
    Balloon.balloonEnums = await result.json();
  }

  static async random(width, height) {
    if (!Balloon.balloonEnums) {
      await Balloon.loadBalloonEnums();
    }
    const randomIndex = Math.floor(Math.random() * Balloon.balloonEnums.length);
    const randomBalloonEnum = Balloon.balloonEnums[randomIndex];
    return new Balloon(randomBalloonEnum.color, randomBalloonEnum.imgSrc, width, height);
  }
}