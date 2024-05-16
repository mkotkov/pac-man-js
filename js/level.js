import config from './config.js';

const {gridWidth} = config;

// Selecting DOM elements
const createGameLevel = () =>{
  // preload
  const preloadDiv = document.createElement('div');
  const body = document.querySelector('body');

  preloadDiv.className = 'preload';
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

//game
const gameDiv = document.createElement('div');
gameDiv.className = 'game';


// container in gameDiv
const  container = document.createElement('div');
container.className = 'container';
for (let i = 0; i < 868; i++) {
    const div = document.createElement('div');
    container.appendChild(div);
}
gameDiv.appendChild(container);


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

const divHighScore = document.createElement('div');
const highScoreP = document.createElement('p');
highScoreP.textContent = "High score : ";
const highScoreSpan = document.createElement('span');
highScoreSpan.className = 'highScore';
highScoreP.appendChild(highScoreSpan);
divHighScore.appendChild(highScoreP);


  // Собираем все элементы вместе
body.appendChild(gameDiv);
body.appendChild(divOnOrOver);
body.appendChild(divHighScore);


}
createGameLevel(); 


const boxes = document.querySelectorAll('.container div');

// Function to number the rows and columns of the grid
// Numbers the rows and columns of the grid
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
    
}
  
// Function to initialize the game board
// Initializes the game board based on the provided layout
const initBoard = board =>{
    for (let i=0 ; i<board.length; i++){
      for(let j=0 ; j<board[i].length ; j++){
        let currentTile = document.querySelector(`div[data-row='${i}'][data-column='${j}']`);
        switch(board[i][j]){
          case 1: //1 is a wall
          currentTile.className = 'wall';
            break;
          case 2:
          currentTile.className = 'empty portal';
          break;
          case 0: // 0 is a dot
          currentTile.className = 'dot empty';         
            break;
          case 8: // 8 is a big dot
          currentTile.className = 'big-dot dot empty';
            break;
          case 6://6 is a blank space
          currentTile.className = 'empty';
            break;
          case 'P'://P is pacman
          currentTile.className = 'empty pacman pacman-right';
            break;
          case 'R': //R is red (blinky)
            let blinky = document.createElement('img');
            blinky.src = "assets/img/blinky.svg";
            blinky.id = 'blinky';
            currentTile.className = 'empty ghost blinky';
            currentTile.appendChild(blinky);
            break;
          case 'B': //B is blue (inky)
            let inky = document.createElement('img');
            inky.src = "assets/img/inky.svg";
            inky.id = 'inky';
            currentTile.className = 'empty ghost inky inkyInitial';
            currentTile.appendChild(inky);
            break;
          case 'Pi': //P is pink (pinky)
            let pinky = document.createElement('img');
            pinky.src = "assets/img/pinky.svg";
            pinky.id = 'pinky';
            currentTile.className = 'empty ghost pinky';
            currentTile.appendChild(pinky);
            break;
          case 'O': //O is orange (clyde)
            let clyde = document.createElement('img');
            clyde.src = "assets/img/clyde.svg";
            clyde.id = 'clyde';
            currentTile.className = 'empty ghost clyde';
            currentTile.appendChild(clyde);
          break;
        }
      }
    }
}  



export {initBoard, numerote};