const quizQuestionsTech = [
  {
    question: "Tech question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsNature = [
  {
    question: "Nature question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsSports = [
  {
    question: "Sports question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsA = [
  {
    question: "A question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsB = [
  {
    question: "B question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsC = [
  {
    question: "C question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsD = [
  {
    question: "D question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsE = [
  {
    question: "E question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizQuestionsF = [
  {
    question: "F question",
    0: "Correct answer",
    1: "Answer b",
    2: "Answer c",
    3: "Answer d",
  },
];

const quizCategories = [
  quizQuestionsTech,
  quizQuestionsNature,
  quizQuestionsSports,
  quizQuestionsA,
  quizQuestionsB,
  quizQuestionsC,
  quizQuestionsD,
  quizQuestionsE,
  quizQuestionsF,
];

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
  correctAnswer: "",
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

  // Hide loading screen and modal
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("modal").style.display = "none";
  gameState.gameStarted = true;
  return;
}

function restartGame() {
  alert("Restarting");
  document.getElementById("end-game-screen").style.display = "none";
  document.getElementById("modal").style.display = "none";

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

    return;
  } else {
    return;
  }
}

function showQuestion(activeCard) {
  // Get preselected question for the data-id and wait for answer
  let categoryIndex = activeCard.getAttribute("data-id");
  let category = quizCategories[categoryIndex];

  document.getElementById("question-card").style.display = "flex";
  document.getElementById("modal").style.display = "block";
  // alert(quizQuestions[0] + ' and ' + quizQuestions[0]['question']);

  document.getElementById("question").textContent = category[0].question;

  //  alert("Card clicked: " + activeCard.getAttribute("data-id"));
  // on click: validate, hide question, deactivate card
  let answerKeys = [0, 1, 2, 3];
  for (answer of document.getElementsByClassName("answer")) {
    // Select random index to shuffle the display order of the questions
    let randomIndex = Math.floor(Math.random() * answerKeys.length);
    console.log(randomIndex);
    // Fill the quiz card with the answers from the quiz dictionary
    answer.textContent = category[0][answerKeys[randomIndex]];
    //    alert(i + randomIndex + "current index: " + i[randomIndex]);
    // Remember the element with the correct answer which is always on index 0
    if (answerKeys[randomIndex] === 0) {
      gameState.correctAnswer = answer.getAttribute("id");
    }
    // Remove the selected index from the list to make sure no answers are being selected multiple times
    answerKeys.splice(randomIndex, 1);

    answer.addEventListener("click", processAnswer);
  }
  // Making an element unclickable: https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events
  activeCard.style.pointerEvents = "none";
  activeCard.style.backgroundColor = "grey";
  return;
}

function processAnswer() {
  // Check if player has clicked on the correct answer
  if (this.getAttribute("id") === gameState.correctAnswer) {
    gameState.activePlayer.score += 1;
  }
  // setTimeout(() => {
  document.getElementById("question-card").style.display = "none";
  document.getElementById("modal").style.display = "none";
  // }, 3000);
  // Switch player and update player area
  nextRound();
  // TODO: move this function to next round, add button logic, button triggers next round
  updatePlayerArea();
  return;
}

function nextRound() {
  // Switch players
  gameState.activePlayer =
    gameState.activePlayer === player1 ? player2 : player1;
  gameState.inactivePlayer =
    gameState.inactivePlayer === player2 ? player1 : player2;
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
  document.getElementById("end-game-screen").style.display = "block";
  document.getElementById("modal").style.display = "block";

  document
    .getElementById("restart-same")
    .addEventListener("click", restartGame);
  document.getElementById("restart-new").addEventListener("click", () => {
    alert(location);
    location.reload();
  });
}
