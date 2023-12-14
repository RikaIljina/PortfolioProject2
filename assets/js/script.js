const playerData = document.getElementById("player-data-form");
// const playerArea1 = document.getElementById("player-1");
const player1 = {
  name: "",
  score: 0,
};
const player2 = {
  name: "",
  score: 0,
};

playerData.elements["submit"].addEventListener("click", initializePlayers);

function initializePlayers(event) {
  event.preventDefault();
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
  return;
}

function updatePlayerArea() {
  document.getElementById("p1-score").textContent = player1.score;
  document.getElementById("p2-score").textContent = player2.score;
  return;
}
