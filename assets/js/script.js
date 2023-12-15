const playerData = document.getElementById("player-data-form");
const cards = document.getElementById("card-area");
// const playerArea1 = document.getElementById("player-1");

const player1 = {
  name: "",
  score: 0,
  id: "p1-name",
};
const player2 = {
  name: "",
  score: 0,
  id: "p2-name",
};

const gameState = {
  gameStarted: false,
  activePlayer: player1,
  inactivePlayer: player2,
  currentRound: 1,
};

// Event listeners
playerData.elements["submit"].addEventListener("click", initializePlayers);
for (let child of cards.children) {
  child.addEventListener("click", cardClicked);
}

function initializePlayers(event) {
  event.preventDefault();

  //TODO: Validate player input

  // Initialize player objects with names
  player1.name = playerData.elements["p1"].value;
  player1.score = 1;
  player2.name = playerData.elements["p2"].value;
  player2.score = 1;

  // Initial update of the player areas to show player names
  document.getElementById("p1-name").textContent =
    playerData.elements["p1"].value;
  document.getElementById("p2-name").textContent =
    playerData.elements["p2"].value;

  updatePlayerArea();

  // Hide loading screen
  document.getElementById("loading-screen").style.display = "none";
  gameState.gameStarted = true;
  return;
}

function restartGame() {
  alert('Restarting');
  document.getElementById('end-game-screen').style.display = 'none';

  gameState.gameStarted = true;
  gameState.currentRound = 1;
  gameState.activePlayer = player1;
  gameState.inactivePlayer = player2;
  player1.score = 0;
  player2.score = 0;

  updatePlayerArea();

  for (let card of cards.children) {
    card.style.pointerEvents = "auto";
    card.style.backgroundColor = "brown";
  }

}

function updatePlayerArea() {
  document.getElementById("p1-score").textContent = player1.score;
  document.getElementById("p2-score").textContent = player2.score;
  // Highlight active player
  document.getElementById(gameState.activePlayer.id).style.color = "red";
  document.getElementById(gameState.inactivePlayer.id).style.color = "black";
  return;
}

function cardClicked() {
  if (gameState.gameStarted === true) {
 //   alert("current round: " + gameState.currentRound);
    // Show question card with relevant data-id and wait for active player input
    showQuestion(this);
    // Switch player and update player area
    nextRound();
    updatePlayerArea();
    return;
  } else {
    return;
  }
}

function showQuestion(activeCard) {
  // Get preselected question for the data-id and wait for answer
//  alert("Card clicked: " + activeCard.getAttribute("data-id"));
  // on click: validate, hide question, deactivate card
  // Making an element unclickable: https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events
  activeCard.style.pointerEvents = "none";
  activeCard.style.backgroundColor = "grey";
  return;
}

function nextRound() {
  // Switch players
  gameState.activePlayer =
    gameState.activePlayer === player1 ? player2 : player1;
  gameState.inactivePlayer =
    gameState.activePlayer === player2 ? player1 : player2;
  // Increment current round by 1
  gameState.currentRound += 1;
  // If currentRound == 10, go to endGame
  if (gameState.currentRound === 10) {
    endGame();
  }
  return;
}

function endGame() {
  gameState.gameStarted = false;
  document.getElementById('end-game-screen').style.display = 'block';
  
document.getElementById('restart-same').addEventListener('click', restartGame);
document.getElementById('restart-new').addEventListener('click', () => {
  alert(location);
  location.reload()});

}
