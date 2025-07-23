const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const finalScoreEl = document.getElementById('finalScore');
const gameOverScreen = document.getElementById('gameOverScreen');

let score = 0;
let time = 30;
let gameTimer;
let moleTimer;
let activeIndex = null;
let moleSpeed = 1000;

function startGame() {
  resetGameState();
  gameTimer = setInterval(updateTime, 1000);
  showMole();
}

function updateTime() {
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    endGame();
  }

  // Speed up moles every 10 seconds
  if (time % 10 === 0 && moleSpeed > 300) {
    moleSpeed -= 100;
  }
}

function showMole() {
  if (activeIndex !== null) {
    holes[activeIndex].classList.remove('mole');
  }

  const index = Math.floor(Math.random() * 9);
  activeIndex = index;
  holes[index].classList.add('mole');

  moleTimer = setTimeout(showMole, moleSpeed);
}

function whackMole(e) {
  if (parseInt(e.target.id) === activeIndex) {
    score++;
  } else {
    score--;
  }
  scoreEl.textContent = score;
}

function endGame() {
  clearInterval(gameTimer);
  clearTimeout(moleTimer);

  if (activeIndex !== null) {
    holes[activeIndex].classList.remove('mole');
  }

  finalScoreEl.textContent = score;
  gameOverScreen.classList.remove('hidden');
}

function resetGameState() {
  score = 0;
  time = 30;
  moleSpeed = 1000;
  activeIndex = null;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  gameOverScreen.classList.add('hidden');
  holes.forEach(h => h.classList.remove('mole'));
  clearTimeout(moleTimer);
  clearInterval(gameTimer);
}

function resetGame() {
  resetGameState();
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);
holes.forEach(h => h.addEventListener('click', whackMole));
