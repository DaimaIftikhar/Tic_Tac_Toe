let cells = document.querySelectorAll(".cell");
let reset = document.getElementById("reset");
let status = document.getElementById("status");
let countX = document.getElementById("counterX");
let countO = document.getElementById("counterO");
let resetScores = document.getElementById("resetScores");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let playerXCounter = 0;
let playerOCounter = 0;

// Load scores from localStorage
window.addEventListener("load", () => {
  let counterX = localStorage.getItem("counterX");
  let counterO = localStorage.getItem("counterO");
  if (counterX) {
    playerXCounter = parseInt(counterX);
    countX.innerText = playerXCounter;
  }
  if (counterO) {
    playerOCounter = parseInt(counterO);
    countO.innerText = playerOCounter;
  }
  highlightLeader();
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    if (e.target.innerText !== "" || !gameActive) return;

    e.target.innerText = currentPlayer;
    board[index] = currentPlayer;
    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.innerText = `Player ${currentPlayer}'s turn`;
    }
  });
});

reset.addEventListener("click", () => {
  for (let cell of cells) {
    cell.innerText = "";
    cell.style.backgroundColor = "";
  }
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.innerText = "Player X’s turn";
});

resetScores.addEventListener("click", () => {
  playerXCounter = 0;
  playerOCounter = 0;
  countX.innerText = 0;
  countO.innerText = 0;
  localStorage.removeItem("counterX");
  localStorage.removeItem("counterO");
  status.innerText = "Scores have been reset!";
  highlightLeader();
});

function checkWinner() {
  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let comb of winningCombinations) {
    const [a, b, c] = comb;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      status.innerText = `🎉 Player ${board[a]} wins! Click reset to play again.`;
      gameActive = false;

      if (board[a] === "X") {
        playerXCounter++;
        countX.innerText = playerXCounter;
        localStorage.setItem("counterX", playerXCounter);
      } else {
        playerOCounter++;
        countO.innerText = playerOCounter;
        localStorage.setItem("counterO", playerOCounter);
      }

      cells[a].style.backgroundColor = "#4CAF50";
      cells[b].style.backgroundColor = "#4CAF50";
      cells[c].style.backgroundColor = "#4CAF50";

      highlightLeader();
      return;
    }
  }

  if (!board.includes("")) {
    status.innerText = "It's a draw!";
    gameActive = false;
  }
}


function highlightLeader() {
  const x = document.getElementById("counterX");
  const o = document.getElementById("counterO");
  x.classList.remove("lead");
  o.classList.remove("lead");

  if (parseInt(x.innerText) > parseInt(o.innerText)) x.classList.add("lead");
  else if (parseInt(o.innerText) > parseInt(x.innerText)) o.classList.add("lead");
}
