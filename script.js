const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-button");
const winnerMessage = document.getElementById("winner-message");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes("")) {
    return "T";
  }

  return null;
}

function handleClick(event) {
  const cellIndex = event.target.id.split("-")[1];

  if (gameBoard[cellIndex] === "" && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      gameActive = false;
      if (winner === "T") {
        winnerMessage.textContent = "Empate!";
      } else {
        winnerMessage.textContent = `Jogador ${winner} venceu!`;
      }
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  winnerMessage.textContent = "";
  cells.forEach((cell) => (cell.textContent = ""));
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
