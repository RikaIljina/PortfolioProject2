const player1 = {
  name: "",
  score: 0,
  wins: 0,
  id: "p1-name",
  color: "#06A77D",
  colorInactive: "#586b66",
};
const player2 = {
  name: "",
  score: 0,
  wins: 0,
  id: "p2-name",
  color: "#F1A208",
  colorInactive: "#736751",
};

const gameState = {
  gameStarted: false,
  activePlayer: player1,
  inactivePlayer: player2,
  currentRound: 1,
  correctAnswer: "",
};

const playerData = document.getElementById("player-data-form");
const cards = document.getElementById("card-area");
let usedCard = "";
// Event listeners
playerData.elements["submit"].addEventListener("click", validateNames);
for (let child of cards.children) {
  child.addEventListener("click", cardClicked);
}

function validateNames(event) {
  event.preventDefault();
  let enteredName1 = playerData.elements["p1"].value;
  let enteredName2 = playerData.elements["p2"].value;
  // Validate player input https://stackoverflow.com/questions/44256226/pattern-validation-with-javascript
  let re = /^[a-zA-Z0-9._-]{1,10}$/;
  if (!re.test(enteredName1) || !re.test(enteredName2)) {
    document.getElementById("input-error").textContent =
      "Please only use letters, numbers, and the symbols . (dot), - (hyphen), _ (underscore) in your names. Name length must be between 1 and 10 characters.";
  } else {
    initializePlayers();
  }
}

function initializePlayers() {
  // Initialize player objects with names

  player1.name = playerData.elements["p1"].value;
  player2.name = playerData.elements["p2"].value;

  // Initial update of the player areas to show player names
  document.getElementById("p1-name").textContent = player1.name;
  document.getElementById("p2-name").textContent = player2.name;

  document.getElementById("player-1").style.backgroundColor = player1.color;
  document.getElementById("player-2").style.backgroundColor = player2.color;

  updatePlayerArea();

  // Hide loading screen and modal
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("modal").style.display = "none";
  gameState.gameStarted = true;
  return;
}

function restartGame() {
  document.getElementById("end-game-screen").style.display = "none";
  document.getElementById("modal").style.display = "none";

  gameState.gameStarted = true;
  gameState.currentRound = 1;
  // gameState.activePlayer = player1;
  //  gameState.inactivePlayer = player2;
  player1.score = 0;
  player2.score = 0;
  document.getElementById("p1-wins").textContent = player1.wins;
  document.getElementById("p2-wins").textContent = player2.wins;

  updatePlayerArea();

  for (let card of cards.children) {
    card.style.pointerEvents = "auto";
    card.style.backgroundColor = "brown";
  }
}

function updatePlayerArea() {
  document.getElementById("p1-score").textContent = player1.score;
  document.getElementById("p2-score").textContent = player2.score;

  let activePlayer = document.getElementById(gameState.activePlayer.id);
  let inactivePlayer = document.getElementById(gameState.inactivePlayer.id);
  
  // Highlight active player
  activePlayer.style.color = "red";
  activePlayer.parentElement.parentElement.style.backgroundColor = gameState.activePlayer.color;
  activePlayer.parentElement.parentElement.style.border = "0.5em solid yellow";
  inactivePlayer.style.color = "black";
  inactivePlayer.parentElement.parentElement.style.backgroundColor = gameState.inactivePlayer.colorInactive;
  inactivePlayer.parentElement.parentElement.style.border = "0.5em solid grey";
  return;
}

function cardClicked() {
  if (gameState.gameStarted === true) {
    // Show question card with relevant data-id and wait for active player input
    document.getElementById("modal").style.display = "block";
    document.getElementById("question-card").style.display = "flex";
    for (answer of document.getElementsByClassName("answer")) {
      answer.style.pointerEvents = "auto";
    }

    showQuestion(this);

    // Making an element unclickable: https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events
    this.style.pointerEvents = "none";
    usedCard = this;

    return;
  } else {
    return;
  }
}

function showQuestion(activeCard) {
  // Get preselected question for the data-id and wait for answer
  let categoryIndex = activeCard.getAttribute("data-id");
  let category = quizCategories[categoryIndex];
  let activeQuestion = category[Math.floor(Math.random() * category.length)];

  document.getElementById("question").textContent = activeQuestion.question;

  // on click: validate, hide question, deactivate card
  let answerKeys = [0, 1, 2, 3];
  for (answer of document.getElementsByClassName("answer")) {
    // Select random index to shuffle the display order of the questions
    let randomIndex = Math.floor(Math.random() * answerKeys.length);
    console.log(randomIndex);
    // Fill the quiz card with the answers from the quiz dictionary
    answer.textContent = activeQuestion[answerKeys[randomIndex]];
    // Remember the element with the correct answer which is always on index 0
    if (answerKeys[randomIndex] === 0) {
      gameState.correctAnswer = answer.getAttribute("id");
    }
    // Remove the selected index from the list to make sure no answers are being selected multiple times
    answerKeys.splice(randomIndex, 1);

    answer.addEventListener("click", processAnswer);
  }

  return;
}

function processAnswer() {
  // Check if player has clicked on the correct answer
  if (this.getAttribute("id") === gameState.correctAnswer) {
    gameState.activePlayer.score += 100;
    this.style.backgroundColor = "green";
    usedCard.style.backgroundColor = gameState.activePlayer.color;
  } else {
    this.style.backgroundColor = "red";
    document.getElementById(gameState.correctAnswer).style.backgroundColor =
      "green";
      usedCard.style.backgroundColor = "grey";
  }

  for (answer of document.getElementsByClassName("answer")) {
    answer.style.pointerEvents = "none";
    answer.removeEventListener("click", processAnswer);
  }

  document.getElementById("close-card").addEventListener("click", nextRound);

  return;
}

function nextRound() {
  document.getElementById("question-card").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("close-card").removeEventListener("click", nextRound);
  for (answer of document.getElementsByClassName("answer")) {
    answer.style.backgroundColor = "";
  }

  // Switch players
  gameState.activePlayer =
    gameState.activePlayer === player1 ? player2 : player1;
  gameState.inactivePlayer =
    gameState.inactivePlayer === player2 ? player1 : player2;
  // Increment current round by 1
  gameState.currentRound += 1;
  updatePlayerArea();

  // If currentRound == 10, go to endGame
  if (gameState.currentRound === 10) {
    endGame();
  }

  return;
}

function endGame() {
  gameState.gameStarted = false;
  document.getElementById("end-game-screen").style.display = "block";
  document.getElementById("modal").style.display = "block";
  if (player1.score === player2.score) {
    document.getElementById(
      "results"
    ).innerHTML = `It's a draw! Play again to see who's better!`;
  } else {
    let winner = player1.score > player2.score ? player1 : player2;
    winner.wins += 1;
    document.getElementById(
      "results"
    ).innerHTML = `Congrats to ${winner.name}! You won this round with a score of ${winner.score}! Play on to tip the scales!`;
  }
  document.getElementById(
    "results"
  ).innerHTML += `<br>Total wins: <br> ${player1.name}: ${player1.wins} <br> ${player2.name}: ${player2.wins}`;

  document
    .getElementById("restart-same")
    .addEventListener("click", restartGame);
  document.getElementById("restart-new").addEventListener("click", () => {
    location.reload();
  });
}
