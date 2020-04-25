import Game from './game.js';
import Balloon from './balloon.js';

window.addEventListener('DOMContentLoaded', async () => {
  'use strict';
  const app = document.getElementById('app');
  const balloonToClick = await Balloon.random();
  const game = new Game(balloonToClick, window.innerWidth, window.innerHeight);
  app.appendChild(game.element);
  game.start();
});