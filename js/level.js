import config from './config.js';

const {gridWidth, gridHeight} = config;

// Create game level elements
const createGameLevel = () => {
  // Create preload div
  const preloadDiv = document.createElement('div');
  preloadDiv.className = 'preload';
  const body = document.querySelector('body');
  const preloadImages = [
    'assets/img/pacman-left.gif',
    'assets/img/pacman-right.gif',
    'assets/img/pacman-up.gif',
    'assets/img/pacman-down.gif',
    'assets/img/ghost.svg'
  ];
  preloadImages.forEach(src => {
    const img = document.createElement('img');
    img.className = 'preload';
    img.src = src;
    preloadDiv.appendChild(img);
  });
  body.appendChild(preloadDiv);

  // Create game div
  const gameDiv = document.createElement('div');
  gameDiv.className = 'game';

  // Create container div in gameDiv
  const container = document.createElement('div');
  container.className = 'container';
  for (let i = 0; i < gridWidth*gridHeight; i++) {
    const div = document.createElement('div');
    container.appendChild(div);
  }
  gameDiv.appendChild(container);
  body.appendChild(gameDiv);

  // Create game over and game on divs
  const divOnOrOver = document.createElement('div');
  const divGameOver = document.createElement('div');
  divGameOver.className = 'gameover';
  const h1 = document.createElement('h1');
  h1.textContent = "GAME OVER";
  const h2 = document.createElement('h2');
  h2.textContent = "Press 'Space' to restart";
  divGameOver.appendChild(h1);
  divGameOver.appendChild(h2);

  const divGameOn = document.createElement('div');
  divGameOn.className = 'gameOn';

  // Create score and lives elements
  const score = document.createElement('p');
  score.textContent = "SCORE : ";
  const spanScore = document.createElement('span');
  spanScore.className = 'score__number';
  spanScore.textContent = "0";
  score.appendChild(spanScore);

  const lives = document.createElement('p');
  lives.textContent = "Lives : ";
  const spanLives = document.createElement('span');
  spanLives.className = 'lives';
  lives.appendChild(spanLives);

  divGameOn.appendChild(score);
  divGameOn.appendChild(lives);
  divOnOrOver.appendChild(divGameOver);
  divOnOrOver.appendChild(divGameOn);

  // Create high score div
  const divHighScore = document.createElement('div');
  const highScoreP = document.createElement('p');
  highScoreP.textContent = "High score : ";
  const highScoreSpan = document.createElement('span');
  highScoreSpan.className = 'highScore';
  highScoreP.appendChild(highScoreSpan);
  divHighScore.appendChild(highScoreP);
  const divPause = document.createElement('div');

divPause.className = 'pause';
const menu = document.createElement('div');
menu.className = 'pause-menu';
const title = document.createElement('h1');
title.textContent = "Pause";
const next = document.createElement('p');
next.className = 'continue'
next.textContent = " press 'space' to continue";
const buttonRestart = document.createElement('button');
buttonRestart.textContent = "Restart";
buttonRestart.addEventListener('click', () => {
  location.reload();
});
const cover = document.createElement('div');
cover.className = 'cover';
menu.appendChild(title);
menu.appendChild(next);
menu.appendChild(buttonRestart);
divPause.appendChild(menu);
divPause.appendChild(cover);

body.appendChild(divPause);
body.appendChild(gameDiv);
body.appendChild(divOnOrOver);
body.appendChild(divHighScore);
};
createGameLevel(); 


// Get all container divs
const boxes = document.querySelectorAll('.container div');

// Number the rows and columns of the grid
const numerote = () => {
  let row = 0;
  let column = 0;
  for (let box of boxes) {
    if (column < gridWidth) {
      box.dataset.row = row;
      box.dataset.column = column;
      column++;
    } else {
      box.dataset.row = row;
      box.dataset.column = column;
      row++;
      column = 0;
    }
  }
};
  
// Initialize the game board based on the provided layout
const initBoard = board =>{
  for (let i=0 ; i<board.length; i++){
    for(let j=0 ; j<board[i].length ; j++){
      let currentTile = document.querySelector(`div[data-row='${i}'][data-column='${j}']`);
      switch(board[i][j]){
        case 1: // Wall
          currentTile.className = 'wall';
          break;
        case 2: // Empty portal
          currentTile.className = 'empty portal';
          break;
        case 0: // Empty dot
          currentTile.className = 'dot empty';         
          break;
        case 8: // Big dot
          currentTile.className = 'big-dot dot empty';
          break;
        case 6:// Empty space
          currentTile.className = 'empty';
          break;
        case 'P': // Pacman
          currentTile.className = 'empty pacman pacman-right';
          break;
        case 'R': // Red (blinky) ghost
          let blinky = document.createElement('img');
          blinky.src = "assets/img/blinky.svg";
          blinky.id = 'blinky';
          currentTile.className = 'empty ghost blinky';
          currentTile.appendChild(blinky);
          break;
        case 'B': // Blue (inky) ghost
          let inky = document.createElement('img');
          inky.src = "assets/img/inky.svg";
          inky.id = 'inky';
          currentTile.className = 'empty ghost inky inkyInitial';
          currentTile.appendChild(inky);
          break;
        case 'Pi': // Pink (pinky) ghost
          let pinky = document.createElement('img');
          pinky.src = "assets/img/pinky.svg";
          pinky.id = 'pinky';
          currentTile.className = 'empty ghost pinky';
          currentTile.appendChild(pinky);
          break;
        case 'O': // Orange (clyde) ghost
          let clyde = document.createElement('img');
          clyde.src = "assets/img/clyde.svg";
          clyde.id = 'clyde';
          currentTile.className = 'empty ghost clyde';
          currentTile.appendChild(clyde);
          break;
      }
    }
  }
};  



export {initBoard, numerote};
