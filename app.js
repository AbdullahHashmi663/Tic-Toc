let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scoreX = 0; 
let scoreO = 0; 

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const turnDisplay = document.getElementById('turn-display');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const cells = document.querySelectorAll('.cell');

function makeMove(index) {
  if (isGameActive && gameState[index] === '') {
    gameState[index] = currentPlayer;
    const cellElement = document.getElementById(`cell-${index}`);
    cellElement.innerText = currentPlayer;
    cellElement.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      displayWinner();
      updateScore();
      isGameActive = false;
      return;
    }
    if (!gameState.includes('')) {
      alert('It\'s a Draw!');
      isGameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnDisplay();
    updateHoverEffect();
  }
}

function updateTurnDisplay() {
  turnDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function updateHoverEffect() {
  const hoverColor = currentPlayer === 'X' ? '#da1e37' : '#57cc99';
  document.documentElement.style.setProperty('--hover-color', hoverColor);

  document.body.classList.toggle('player-x', currentPlayer === 'X');
  document.body.classList.toggle('player-o', currentPlayer === 'O');
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function displayWinner() {
  const resultMessage = `Congratulations! Player ${currentPlayer} Wins!`;
  alert(resultMessage);
}

function updateScore() {
  if (currentPlayer === 'X') {
    scoreX++;
    scoreXDisplay.textContent = `Player "X": ${scoreX}`;
  } else {
    scoreO++;
    scoreODisplay.textContent = `Player "O": ${scoreO}`;
  }
}

function nextMatch() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
  });
  updateTurnDisplay();
  updateHoverEffect();
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  scoreX = 0;
  scoreO = 0;
  scoreXDisplay.textContent = `Player "X": ${scoreX}`;
  scoreODisplay.textContent = `Player "O": ${scoreO}`;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
  });
  updateTurnDisplay();
  updateHoverEffect();
}

updateHoverEffect();
