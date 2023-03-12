import mems from './mems.js';
import weather from './weather.js';

const game = document.querySelector('.game');
const result = document.querySelector('.result');
const yourself = document.querySelector('.yourself');
const youVsBot = document.querySelector('.you-vs-bot');
const botVsBot = document.querySelector('.bot-vs-bot');
const reset = document.querySelector('.reset');
const scorePirate = document.querySelector('.score-pirate');
const scoreBox = document.querySelector('.score-box');
const scoreFriend = document.querySelector('.score-friend');
const soundOn = document.querySelector('.sound-on');
const soundOff = document.querySelector('.sound-off');
let bntsGame = document.getElementsByClassName('new-game');
const overlay = document.querySelector('.overlay');
const bird = document.querySelector('.bird');
const birdContainer = document.querySelector('.sprite-container');
const fields = document.querySelectorAll('.field');
let fieldsVoid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let fieldsFulls = [];
let step = false;
let direction = true;
let count = 0;
let bot = 0;
let rightPosition = 0;
let rightMove = 0;
let checkWin = false;
let sound = true;
const soundPirate = new Audio();
soundPirate.src = './assets/sounds/nozh.mp3';
soundPirate.volume = 0.3;
const soundPirateWin = new Audio();
soundPirateWin.src = './assets/sounds/terrorist-wins.mp3';
const soundBox = new Audio();
soundBox.src = './assets/sounds/box.mp3';
const soundBoxWin = new Audio();
soundBoxWin.src = './assets/sounds/box-win.mp3';
const soundButton = new Audio();
soundButton.src = './assets/sounds/button.mp3';
const soundFriend = new Audio();
soundFriend.src = './assets/sounds/druzhba.mp3';
soundFriend.volume = 0.5;
const soundBackground = new Audio();
soundBackground.src = './assets/sounds/backround.mp3';
soundBackground.volume = 0.25;
const soundMems = new Audio();
soundMems.src = mems[`${getRandomInt(88)}`];
soundMems.volume = 0.5;
const points = {
  pirate: 0,
  box: 0,
  friend: 0
}

function stepPirate(target) {
  if (sound) {
    soundPirate.play();
  }
  target.childNodes[3].classList.add('view');
  target.childNodes[1].classList.add('clear');
  target.classList.add('x');
  fieldsFulls.push(target);
  fieldsFulls.forEach(fieldFull => {
    fieldFull.addEventListener('click', stopEvent);
  });
  getFieldsVoid(target);
  count++;
}
function stepZero(target) {
  if (sound) {
    soundBox.play();
  }
  target.childNodes[5].classList.add('view');
  target.childNodes[1].classList.add('clear');
  target.classList.add('o');
  fieldsFulls.push(target);
  fieldsFulls.forEach(fieldFull => {
    fieldFull.addEventListener('click', stopEvent);
  });
  getFieldsVoid(target);
  count++;
}
function init(e) {
  if (bot === 1) {
    stepPirate(e.target);
    win();
    game.removeEventListener('click', init);
    if (!checkWin) {
      setTimeout(() => stepZero(fieldVoid()), 500);
      setTimeout(() => win(), 501);
      setTimeout(() => game.addEventListener('click', init), 700);
    }
  } else if (bot === 0) {
    if (!step) {
      stepPirate(e.target)
    } else stepZero(e.target);
    step = !step;
    win();
  } else if (bot === 2) {
    game.removeEventListener('click', init);
    let bot2 = setInterval(() => {
      if (!checkWin && fieldVoid()) {
        stepPirate(fieldVoid());
        win();
        if (!checkWin) {
          setTimeout(() => {
            stepZero(fieldVoid());
            win();
          }, 750);
        }
      }
      if (checkWin) {
        clearInterval(bot2);
      }
    }, 1500);

  }
}
function newGame() {
  if (sound) {
    soundButton.play();
  }
  step = false;
  checkWin = false;
  count = 0;
  fieldsVoid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  result.innerHTML = '';
  overlay.style.display = 'none';
  fields.forEach(field => {
    field.childNodes[1].classList.remove('clear');
    field.childNodes[3].classList.remove('view');
    field.childNodes[5].classList.remove('view');
    field.classList.remove('o', 'x');
    // field.addEventListener('click', init);
  });
  fieldsFulls.forEach(field => {
    field.removeEventListener('click', stopEvent);
  });
  fieldsFulls = [];
  game.addEventListener('click', init);
}
function stopEvent(e) {
  e.stopImmediatePropagation();
}
function win() {
  let comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < comb.length; i++) {
    if (fields[comb[i][0]].classList.contains('x') &&
      fields[comb[i][1]].classList.contains('x') &&
      fields[comb[i][2]].classList.contains('x')) {
      if (sound) {
        soundPirateWin.play();
      }
      checkWin = true;
      game.removeEventListener('click', init);
      setTimeout(() => {
        result.innerHTML = `<div class="container-res">
        <h2 class="res">Pirates win!</h2>
        <button class="new-game">new game</button>
      </div>`;
        bntsGame = document.getElementsByClassName('new-game')
        for (let i = 0; i < bntsGame.length; i++) {
          bntsGame[i].addEventListener('click', newGame);
        }
        overlay.style.display = 'block';
        points.pirate++;
        scorePirate.textContent = points.pirate;
      }, 1500);
      return;
    } else if (fields[comb[i][0]].classList.contains('o') &&
      fields[comb[i][1]].classList.contains('o') &&
      fields[comb[i][2]].classList.contains('o')) {
      if (sound) {
        soundBoxWin.play();
      }
      checkWin = true;
      game.removeEventListener('click', init);
      setTimeout(() => {
        result.innerHTML = `<div class="container-res">
        <h2 class="res">Box win!</h2>
        <button class="new-game">new game</button>
      </div>`;
        bntsGame = document.getElementsByClassName('new-game')
        for (let i = 0; i < bntsGame.length; i++) {
          bntsGame[i].addEventListener('click', newGame);
        }
        overlay.style.display = 'block';
        points.box++;
        scoreBox.textContent = points.box;
      }, 1500);
      return;
    }
  }
  if (count == 9 && !checkWin) {
    if (sound) {
      soundFriend.play();
    }
    points.friend++;
    checkWin = true;
    game.removeEventListener('click', init);
    setTimeout(() => {
      result.innerHTML = `<div class="container-res">
      <h2 class="res">Friend win!</h2>
      <button class="new-game">new game</button>
    </div>`;
      bntsGame = document.getElementsByClassName('new-game')
      for (let i = 0; i < bntsGame.length; i++) {
        bntsGame[i].addEventListener('click', newGame);
      }
      overlay.style.display = 'block';
      scoreFriend.textContent = points.friend;
    }, 1500);
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getFieldsVoid(target) {
  if (fieldsVoid.length > 0) {
    fieldsVoid = fieldsVoid.filter((field) => field !== +(target.classList[1]));
  }
}
function fieldVoid() {
  return fields[fieldsVoid[getRandomInt(fieldsVoid.length)]];
}
function soundBackgroundPlay() {
  soundBackground.play();
}
function birdFlap() {
  rightPosition++;
  if (rightPosition > 3) {
    rightPosition = 0;
  }
  bird.style.left = `-${rightPosition * 167}px`;
}
function fly() {
  if (direction) {
    rightMove += 0.25;
    birdContainer.style.left = `${rightMove}%`;
    if (rightMove >= 60) {
      birdContainer.style.transform = 'scale(-1, 1)';
      direction = false;
    }
  } else {
    rightMove -= 0.25;
    birdContainer.style.left = `${rightMove}%`;
    if (rightMove <= 0) {
      birdContainer.style.transform = 'scale(1, 1)';
      direction = true;
    }
  }
  window.requestAnimationFrame(fly);
}
function playMems() {
  if (sound) {
    soundBackground.volume = 0.05;
    soundMems.play();
    console.log('cklck');
    bird.removeEventListener('click', playMems);
    setTimeout(() => {
      soundBackground.volume = 0.25;
      soundMems.src = mems[`${getRandomInt(88)}`];
      bird.addEventListener('click', playMems);
    }, Math.ceil(soundMems.duration * 1000));
  }
}
for (let i = 0; i < bntsGame.length; i++) {
  bntsGame[i].addEventListener('click', newGame);
}
game.addEventListener('click', init);
yourself.addEventListener('click', () => {
  bot = 0;
  if (sound) {
    soundButton.play();
  }
});
youVsBot.addEventListener('click', () => {
  bot = 1;
  if (sound) {
    soundButton.play();
  }
});
botVsBot.addEventListener('click', () => {
  bot = 2;
  if (sound) {
    soundButton.play();
  }
  init(null)
});
reset.addEventListener('click', () => {
  if (sound) {
    soundButton.play();
  }
  points.pirate = 0;
  points.box = 0;
  points.friend = 0;
  scoreFriend.textContent = points.friend;
  scorePirate.textContent = points.pirate;
  scoreBox.textContent = points.box;
});
soundOn.addEventListener('click', () => {
  if (sound) {
    soundButton.play();
  }
  document.addEventListener('click', soundBackgroundPlay);
  sound = true;
});
soundOff.addEventListener('click', () => {
  if (sound) {
    soundButton.play();
  }
  document.removeEventListener('click', soundBackgroundPlay);
  soundBackground.pause();
  sound = false;
});
bird.addEventListener('click', playMems);
document.addEventListener('click', soundBackgroundPlay);
fly();
weather();
setInterval(() => {
  birdFlap();
}, 100);