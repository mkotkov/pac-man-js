import {initBoard, numerote} from './level.js';
import config from './config.js';

const { initialBoard, board, gridWidth, gridHeight} = config;

/*
 * Coordinates of the ghosts and Pac-Man on the board:
 * Red (already out): 11x 13y
 * Blue: 14x 11y
 * Rose: 14x 13y
 * Orange: 14x 15y
 */



// Game variables
let score = 0;
let lives = 3;
let reset = true;
let game = true;
let level = 1;
let levelUp = false;
let pacman;
let blinky;
let inky;
let pinky;
let clyde;
pacman = null;
blinky = null;
inky = null;
pinky = null;
clyde = null;

let timeoutPinky = null;
let timeoutInky = null;
let timeoutClyde = null;

const scoreNode = document.querySelector('.score__number');
const livesNode = document.querySelector('.lives');
const gameoverNodes = document.querySelector('.gameover');
const gameOnNodes = document.querySelector('.gameOn');
const highScoreNode = document.querySelector('.highScore');
const styleElem = document.head.appendChild(document.createElement('style'));



  // Function to reset positions of characters and game variables
// Resets the positions of characters and game variables
const resetPositions = () => {
  reset = true;
  
  //pacman
  cancelAnimationFrame(pacman.animation);
  pacman.tile.className = 'empty';
  pacman.tile.style.transform = 'none';
  pacman.numberEaten = 1;
  pacman.i = 0;
  pacman.direction ='right';
  pacman.nextDirection = undefined;
  pacman.stopped = true;
  pacman.test = true;
  pacman.turnTest = false;
  pacman.x = 23;
  pacman.y = 14;
  pacman.tile = document.querySelector(`div[data-row='${pacman.x}'][data-column='${pacman.y}']`);

  //ghosts
  cancelAnimationFrame(blinky.animation);
  cancelAnimationFrame(inky.animation);
  cancelAnimationFrame(pinky.animation);
  cancelAnimationFrame(clyde.animation);
  clearTimeout(timeoutPinky);
  clearTimeout(timeoutInky);
  clearTimeout(timeoutClyde);
  clearTimeout(blinky.offTimeout);
  clearTimeout(inky.offTimeout);
  clearTimeout(pinky.offTimeout);
  clearTimeout(clyde.offTimeout);
  clearTimeout(blinky.blinkTimeout);
  clearTimeout(inky.blinkTimeout);
  clearTimeout(pinky.blinkTimeout);
  clearTimeout(clyde.blinkTimeout);
  clearInterval(blinky.interval);
  clearInterval(inky.interval);
  clearInterval(pinky.interval);
  clearInterval(clyde.interval);

  //resets positions
  blinky.ghostmode = false;
  blinky.i = 0;
  blinky.out = true;
  blinky.tile.className = 'empty';
  blinky.tile.innerHTML = '';
  blinky.tile.style.transform = 'none';
  blinky.x = 11;
  blinky.y = 13;
  blinky.speed = 13;
  blinky.tile = document.querySelector(`div[data-row='${blinky.x}'][data-column='${blinky.y}']`);
  inky.ghostmode = false;
  inky.i = 0;
  inky.out = false;
  inky.tile.className = 'empty';
  inky.tile.innerHTML = '';  
  inky.tile.style.transform = 'none';
  inky.x = 14;
  inky.y = 11;
  inky.speed = 13;
  inky.tile = document.querySelector(`div[data-row='${inky.x}'][data-column='${inky.y}']`);
  pinky.ghostmode = false;
  pinky.i = 0;
  pinky.out = false;
  pinky.tile.className = 'empty';
  pinky.tile.innerHTML = '';
  pinky.tile.style.transform = 'none';
  pinky.x = 14;
  pinky.y = 13;
  pinky.speed = 13;
  pinky.tile = document.querySelector(`div[data-row='${pinky.x}'][data-column='${pinky.y}']`);
  clyde.ghostmode = false;
  clyde.i = 0;
  clyde.out = false;
  clyde.tile.className = 'empty';
  clyde.tile.innerHTML = '';
  clyde.tile.style.transform = 'none';
  clyde.x = 14;
  clyde.y = 15;
  clyde.speed = 13;
  clyde.tile = document.querySelector(`div[data-row='${clyde.x}'][data-column='${clyde.y}']`);
  //lives and gameover
  if(levelUp){
    lives ++;
    level ++;
  } 
  else {
    lives --;
  }
  livesNode.innerHTML = lives;
  if (lives === 0){
    game = false;
    let highScore = parseInt(localStorage.getItem("highScore"));
    if (!highScore || score >= highScore){
      highScoreNode.innerHTML = score;
      localStorage.setItem('highScore', score);
    }
    for (let i=0 ; i < board.length; i++){
      board[i] = initialBoard[i].slice();
    }
    gameOnNodes.style.display = 'none';
    gameoverNodes.style.display = 'flex';
  }
  if(game){
    if(levelUp){
      levelUp = false;
      for (let i=0 ; i<board.length; i++){
        board[i] = initialBoard[i].slice();
      }
    }
    initBoard(board);
  }
}

numerote();
initBoard(initialBoard);

// Setting initial number of lives
livesNode.innerHTML = lives;

// Character class representing game characters
class Character {
  constructor(name,tile,x,y, speed) {
    this.name = name;
    this.tile = tile;
    this.x = x;
    this.y = y;
    this.i = 0;
    this.speed = speed
  }

  testNextTile(){
    switch (this.direction){
      case 'right':
        if (this.y+1 <= gridWidth && board[this.x][this.y+1] !== 1){
          this.y += 1;
          this.test = true;
        }
        else {
          if (this.tile.classList.contains('portal')){
            if (this.tile.dataset.column === "27"){
              this.y = 0;
            } else {
              this.y = 27;
            }
            this.test = true;
            return;
          }
          this.test = false;
        }
        break;
      case 'left':
        if (this.y-1 >= 0 && board[this.x][this.y-1] !== 1){
          this.y -= 1;
          this.test = true;
        }
        else {
          if (this.tile.classList.contains('portal')){
            if (this.tile.dataset.column === "27"){
              this.y = 0;
            } else {
              this.y = 27;
            }
            this.test = true;
            return;
          }
          this.test = false;
        }
        break;
      case 'down':
        if(this.x+1 <= gridHeight && board[this.x+1][this.y] !== 1){
          this.x += 1;
          this.test = true;
        }
        else {
          this.test = false;
        }
        break;
      case 'up':
        if(this.x-1 >= 0 && board[this.x-1][this.y] !== 1){
          this.x -= 1;
          this.test = true;
        }
        else {
          this.test = false;
        }
        break;
    }
  }

  animate(){
    if(this.i<100){
      if(this.i === 0){
        if (this.name === 'pacman'){
          if (this.nextDirection !== this.direction){
            this.testNextDirection();
            if(this.turnTest){
              this.turn();
              this.direction = this.nextDirection;
            }
          }
          this.testNextTile();
          if(!this.test){
            this.tile.style.transform = 'none';
            this.stopped  = true;
            return;
          }
        }
        else if(this.name !== 'pacman'){
          this.tile.style.transform = 'none';
          this.testDirections();
        }
      }
      switch (this.direction){
        case 'right':
          this.tile.style.transform = `translateX(${this.i}%)`;
          break;
        case 'left':
          this.tile.style.transform = `translateX(-${this.i}%)`;
          break;
        case 'down':
          this.tile.style.transform = `translateY(${this.i}%)`;
          break;
        case 'up':
          this.tile.style.transform = `translateY(-${this.i}%)`;
          break;
      }
      this.i += this.speed;
      cancelAnimationFrame(this.animation);
      this.animation = requestAnimationFrame(() => this
      .animate());
    }
    else{
      this.i=0;
      if(this.test){
        cancelAnimationFrame(this.animation);
        this.move();
      }
    }
  }
}

// Class representing Pacman character
class Pacman extends Character {
  constructor(name, tile, x, y, speed) {
    super(name, tile, x, y, speed);
    this.i = 0; // Animation frame counter
    this.direction = 'right'; // Current direction of Pacman
    this.nextDirection = undefined; // Direction Pacman will turn next
    this.stopped = false; // Flag indicating whether Pacman is stopped
    this.test = true; // Flag for collision testing
    this.turnTest = false; // Flag for testing turns
    this.animation; // Animation frame ID
    this.numberEaten = 1; // Number of dots eaten by Pacman
    this.turnAround; // Variable to handle turning animations
  }

   // Method to turn Pacman
  turn(){
    this.stopped = false;
    this.tile.classList.remove(`pacman-${this.direction}`);
    this.tile.classList.add(`pacman-${this.nextDirection}`);
    this.direction = this.nextDirection;
  }

  move(){
    this.stopped = false;
    this.tile.style.transform = 'none';
    this.tile.classList.remove(this.name);
    this.tile.classList.remove(`pacman-${this.direction}`);
    this.tile = document.querySelector(`div[data-row='${this.x}'][data-column='${this.y}']`);
    this.tile.classList.add(this.name);
    this.tile.classList.add(`pacman-${this.direction}`);

    //Handles score count
    let ghost;
    if (this.tile.classList.contains('ghost')){
      if (this.tile.className.includes('blinky')){
        ghost = blinky;
      }
      else if (this.tile.className.includes('pinky')){
        ghost = pinky;
      }
      else if (this.tile.className.includes('inky')){
        ghost = inky;
      }
      else {
        ghost = clyde;
      }
      if (ghost.ghostmode){
        if (this.tile.classList.contains('dot')){
          this.tile.classList.remove('dot');
          board[this.x][this.y] = 6;
        }
        let tempScore = 200 * this.numberEaten;
        styleElem.innerHTML = `.pacman::after {content:'${tempScore}';}`;
        setTimeout(() => { styleElem.innerHTML = ' '}, 500);
        score += tempScore;
        this.numberEaten ++;
        backtoBase(ghost);
      }
      else{ 
        resetPositions();  
        return; 
      }
    }
    else if (this.tile.classList.contains('big-dot')){
      this.tile.classList.remove('big-dot');
      this.tile.classList.remove('dot');
      
      modeGhost();
      score += 50;
      if (score >= level*2610){
        if(!document.querySelector('.dot')){
          levelUp = true;
          resetPositions();  
          return; 
        }
      }
      board[this.x][this.y] = 6;
      scoreNode.innerHTML = score;
    }else if (this.tile.classList.contains('dot')){
      this.tile.classList.remove('dot');
      score += 10;
      board[this.x][this.y] = 6;
      if (score >= level*2610){
        if(!document.querySelector('.dot')){
          levelUp = true;
          resetPositions();  
          return; 
        }
      }
      scoreNode.innerHTML = score;
    }
    this.animation = requestAnimationFrame(() => this.animate());
  }

  testNextDirection(){
    switch (this.nextDirection){
      case 'right':
        if (this.y+1 <= gridWidth && board[this.x][this.y+1] !== 1){
          this.turnTest = true;
        }
        else {
          this.turnTest = false;
        }
        break;
      case 'left':
        if (this.y-1 >= 0 && board[this.x][this.y-1] !== 1){
          this.turnTest = true;
        }
        else {
          this.turnTest = false;
        }
        break;
      case 'down':
        if(this.x+1 <= gridHeight && board[this.x+1][this.y] !== 1){
          this.turnTest = true;
        }
        else {
          this.turnTest = false;
        }
        break;
      case 'up':
        if(this.x-1 >= 0 && board[this.x-1][this.y] !== 1){
          this.turnTest = true;
        }
        else {
          this.turnTest = false;
        }
        break;
    }
  }
}

class Ghost extends Character {
  constructor(name,tile,x,y, speed, out){
    super(name,tile,x,y,speed);
    this.out = out;
    this.i = 0;
    this.direction = 'right';
    this.possibleDirections;
    this.test = true;
    this.nextDirection;
    this.animation;
    this.interval;
    this.offTimeout;
    this.blinkTimeout;
    this.ghostmode = false;
  }
  getRandomDirection(){
    let randomNumber = Math.floor(Math.random() * (this.possibleDirections.length))+1;
    let randomDirection = this.possibleDirections[randomNumber-1];
    switch (randomDirection){
      case 1 :
        this.direction = 'right';
        this.y+=1;
        break;
      case 2 :
        this.direction = 'left';
        this.y-=1;
        break;
      case 3 :
        this.direction = 'down';
        this.x+=1;
        break;
      case 4 :
        this.direction = 'up';
        this.x-=1;
        break;
    }
  }

  move(){
    if (reset){
      return;
    }
    this.tile.style.transform = 'none';
    this.tile.classList.remove(this.name);
    this.tile.classList.remove('ghost');
    if(this.tile.firstElementChild){
      this.tile.firstElementChild.classList.remove('blink');
    }
    let node = this.tile.querySelector(`#${this.name}`);
    if(node){
      this.tile.removeChild(node);
    }
    this.tile = document.querySelector(`div[data-row='${this.x}'][data-column='${this.y}']`);
    if (this.tile.classList.contains('pacman')){
      if (this.ghostmode){
        let tempScore = 200 * pacman.numberEaten;
        styleElem.innerHTML = `.pacman::after {content:'${tempScore}';}`;
        setTimeout(() => { styleElem.innerHTML = ' '}, 500);
        score += tempScore;
        pacman.numberEaten ++;
        if (this.tile.classList.contains('dot')){
          this.tile.classList.remove('dot');
          board[this.x][this.y] = 6;
        }
        backtoBase(this);
        return;
      }
      else{
        resetPositions();
        return;    
      }
    }
    this.tile.classList.add(this.name);
    this.tile.classList.add('ghost');
  
    if(node){
      this.tile.insertAdjacentElement('afterbegin', node);
    }
    if (this.nextDirection){
      this.direction = this.nextDirection;
      this.nextDirection = undefined;
    }
    cancelAnimationFrame(this.animation);
    if(this.out){
      this.animation = requestAnimationFrame(() => this.animate());
    }
  }

  outOfBase(){
    let difference = 13 - this.y;
    //move to central tile of base(14,13);
    if (difference > 0){
      this.direction = 'right';
      this.animation = requestAnimationFrame(() => this.outOfBaseAnimate());
    }
    else if (difference < 0){
      this.direction = 'left';
      this.animation = requestAnimationFrame(() => this.outOfBaseAnimate());
    }
    else if (difference === 0){
      this.direction = 'up';
      this.animation = requestAnimationFrame(()  => this.outOfBaseAnimate());
    }
  }

  outOfBaseAnimate(){
    this.i+= 10;
    switch (this.direction){
      case 'right':
        this.tile.style.transform = `translateX(${this.i}%)`;
        break;
      case 'left':
        this.tile.style.transform = `translateX(-${this.i}%)`;
        break;
      case 'up':
        this.tile.style.transform = `translateY(-${this.i}%)`;
        break;
    }
    if (this.direction !== 'up' && this.i > 190){
      this.y = 13;
      this.i = 0;
      this.direction = 'up';
      this.move();
    }
    else if(this.i >= 300){
      this.x = 11;
      this.y = 13;
      this.i = 0;
      this.out = true;
      this.move();
      return;
    }
    this.animation = requestAnimationFrame(() => this.outOfBaseAnimate());
  }
  
  modeGhostOn(){
    if (this.out){
      this.speed = 7;
      clearInterval(this.interval);
      clearTimeout(this.offTimeout);
      clearTimeout(this.blinkTimeout);
      if(!this.ghostmode){
        switch(this.direction){
          case 'right':
            this.nextDirection = 'left';
            break;
          case 'left':
            this.nextDirection = 'right';
            break;
          case 'up':
            this.nextDirection = 'down';
            break;
          case 'down':
            this.nextDirection = 'up';
            break;
        }
      }
      let img = document.createElement('img');
      img.id = this.name;
      img.src = "assets/img/ghost.png";
      this.tile.innerHTML = '';
      this.tile.appendChild(img);
      this.ghostmode = true;
      this.blinkTimeout = setTimeout(()=> {
        this.interval = setInterval(() => {
          if (this.tile.firstElementChild){
            this.tile.firstElementChild.classList.toggle('blink');
          }
        }, 500)
      },4000);
      this.offTimeout = setTimeout(()=> {
        this.modeGhostOff();
      }, 7000);
    }
  }

  modeGhostOff(){
    pacman.numberEaten = 1;
    this.speed = 13;
    clearInterval(this.interval);
    this.tile.innerHTML = '';
    let img = document.createElement('img');
    img.id = this.name;
    img.src = `assets/img/${this.name}.png`;
    this.tile.appendChild(img);
    this.ghostmode = false;
  }

  testDirections(){
    if (this.tile.classList.contains('portal') && this.possibleDirections){
      if (this.tile.dataset.column === "27"){
        this.y = 0;
      } else {
        this.y = 27;
      }
      this.possibleDirections = false;
      return;
    }
    let possibleDirectionsArray = [];
    if(this.y+1 <= gridWidth && board[this.x][this.y+1] !== 1 && this.direction !== 'left'){  //test for direction is to avoid the ghosts turning around
      possibleDirectionsArray.push(1);
    }
    if(this.y-1 >= 0 && board[this.x][this.y-1] !== 1 && this.direction !== 'right'){
      possibleDirectionsArray.push(2);
    }
    if(this.x+1 <= gridHeight && board[this.x+1][this.y] !== 1 && this.direction !== 'up'){
      possibleDirectionsArray.push(3);
    }
    if(this.x-1 >= 0 && board[this.x-1][this.y] !== 1 && this.direction !== 'down'){
      possibleDirectionsArray.push(4);
    }
    this.possibleDirections = possibleDirectionsArray;
    this.getRandomDirection();
  }
}

//OBJECTS
function initCharacters () {
  pacman = new Pacman('pacman',document.querySelector('.pacman'),23,14,10);
  blinky = new Ghost('blinky',document.querySelector('.blinky'),11,13, 13, true);
  pinky =  new Ghost('pinky',document.querySelector('.pinky'),14,13, 13, false);
  inky = new Ghost('inky',document.querySelector('.inky'),14,11, 13, false);
  clyde = new Ghost('clyde',document.querySelector('.clyde'),14,15, 13, false);
}

function startMoving(){
    reset = false;
    pacman.move();
    blinky.move();
    timeoutPinky = setTimeout(() => pinky.outOfBase(), 1000);
    timeoutInky = setTimeout(() => {
      inky.outOfBase();
      document.getElementById('inky').classList.remove('inkyInitial');
    }, 8000);
    timeoutClyde = setTimeout(() => clyde.outOfBase(), 15000);
}

function keydownHandler(e){
  e.preventDefault();
  if (game){
    if (reset){
      startMoving();
    }
    else{
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        let input = e.key.substring(5).toLowerCase();
        if(!pacman.stopped){
          pacman.nextDirection = input;
        }
        else if (input !== pacman.direction && pacman.stopped){
          pacman.nextDirection = input;
          pacman.turn();
          pacman.animate();
        }
      }
    }
  }
  else {
    if (e.keyCode === 32){
      initBoard(board);
      level = 1;
      score = 0;
      lives = 3;
      game = true;
      scoreNode.innerHTML = score;
      livesNode.innerHTML = lives;
      gameOnNodes.style.display = 'flex';
      gameoverNodes.style.display = 'none';
    }
  }
}

function modeGhost(){
  blinky.modeGhostOn();
  inky.modeGhostOn();
  pinky.modeGhostOn();
  clyde.modeGhostOn();
}

function backtoBase(ghost){
  ghost.ghostmode = false;
  ghost.speed = 13;
  cancelAnimationFrame(ghost.animation);
  clearInterval(ghost.interval);
  clearTimeout(ghost.offTimeout);
  clearTimeout(ghost.blinkTimeout);
  ghost.i = 0;
  ghost.out = false;
  ghost.tile.classList.remove('ghost');
  ghost.tile.classList.remove('blinky');
  ghost.tile.classList.remove('pinky');
  ghost.tile.classList.remove('inky');
  ghost.tile.classList.remove('clyde');
  ghost.tile.innerHTML = '';
  ghost.x = 14;
  ghost.y = 13;
  ghost.tile = document.querySelector(`div[data-row='${ghost.x}'][data-column='${ghost.y}']`);
  ghost.speed = 13;
  clearInterval(ghost.interval);
  let img = document.createElement('img');
  img.id = ghost.name;
  img.src = `assets/img/${ghost.name}.png`;
  ghost.tile.classList.add('ghostBase');
  ghost.tile.appendChild(img);
  setTimeout(() => {
    if(!reset){
      ghost.outOfBase()
    }
  },3000);
  if (!blinky.ghostmode && !inky.ghostmode && !pinky.ghostmode && !clyde.ghostmode){
    pacman.numberEaten = 1;
  }
}

document.addEventListener('keydown', keydownHandler);
initCharacters();
let highScore = parseInt(localStorage.getItem("highScore"));
if (highScore){
  highScoreNode.innerHTML = highScore;
}
