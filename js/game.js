'use strict';
import Element from './element.js';
import Ballon from './balloon.js';

export default class Game extends Element {
  balloonToClick;
  balloonContainer;
  instructionsContainer;
  timerContainer;
  interval;
  height;
  score;
  width;
  startTime;
  timer;

  static HOW_OFTEN_TO_RENDER_BALLOONS_MS = 100;
  static HOW_MANY_BALLOONS_TO_RENDER = 5;
  static HOW_LONG_A_BALLOON_EXISTS_MS = 5000;
  static GAME_LENGTH_TIMER_MS = 10000;

  constructor(balloonToClick, width, height) {
    super();
    this.balloonContainer = document.createElement('div');
    this.balloonToClick = balloonToClick;
    this.instructionsContainer = document.createElement('div');
    this.timerContainer = document.createElement('div');
    this.height = height;
    this.score = 0;
    this.width = width;

    this.element.appendChild(this.timerContainer);
    this.element.appendChild(this.instructionsContainer);
    this.element.appendChild(this.balloonContainer);
  }

  render = () => {
    this.balloonToClick.width = '1em';
    this.balloonToClick.height = '1em';
    this.balloonToClick.render();
    this.balloonToClick.element.style.left = `0`;
    this.balloonToClick.element.style.top = `0`;
    this.instructionsContainer.innerText = `Click the ${this.balloonToClick.color} balloons`;
    this.instructionsContainer.appendChild(this.balloonToClick.element);
  }
  
  start = () => {
    this.interval = setInterval(this.renderBalloons, Game.HOW_OFTEN_TO_RENDER_BALLOONS_MS);
    this.startTime = performance.now();
    this.timer = setInterval(this.tickClock, 1000);
    this.tickClock();
    this.render();
    this.renderBalloons();
  }

  timeLeft = (startTime, countdownFrom) => {
    const timePassed = Math.floor(Math.abs(startTime - performance.now()) / 1000);
    return countdownFrom - timePassed;
  }

  tickClock = () => {
    const timeLeft = this.timeLeft(this.startTime, Game.GAME_LENGTH_TIMER_MS / 1000);
    this.timerContainer.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(this.timer);
      this.end();
    }
  }

  end = () => {
    clearInterval(this.interval);
    this.balloonContainer.innerHTML = '';
    this.instructionsContainer.innerText = `Your score was ${this.score}`;
  }

  renderBalloons = async () => {
    for(var i=0; i<Game.HOW_MANY_BALLOONS_TO_RENDER; i++) {
      this.renderBalloon();
    }
  }

  renderBalloon = async () => {
    const balloon = await Ballon.random('100px', '200px');
    balloon.render();

    balloon.element.addEventListener('click', () => {
      balloon.element.remove();
      this.calculateScoreForBalloonClick(balloon.color);
    });

    const location = this.getRandomLocationForBalloon(this.width - 100, this.height - 200);
    balloon.element.style.left = `${location.x}px`;
    balloon.element.style.top = `${location.y}px`;

    this.balloonContainer.appendChild(balloon.element);

    setTimeout(() => {
      balloon.element.remove();
    }, Game.HOW_LONG_A_BALLOON_EXISTS_MS);
  }

  getRandomLocationForBalloon = (maxX, maxY) => {
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    }
  }

  calculateScoreForBalloonClick = (colorClicked) => {
    if (colorClicked === this.balloonToClick.color) {
      this.score++;
    } else {
      this.score--;
    }
    console.log(this.score);
  }
}