// Player objects with all player-related data
const player1 = {
  name: "",
  score: 0,
  wins: 0,
  id: "p1-name",
  color: "#4C672E", //"#EDABAB", //"#F55757", // f39c12
  colorInactive: "#4C672E", // "#F5D4D4", // "#EB8686",
  colorText: "#e0ebd1",
};
const player2 = {
  name: "",
  score: 0,
  wins: 0,
  id: "p2-name",
  color: "#26334B", //"#B4D3E9", // "#6CC2FF", //e67e22
  colorInactive: "#26334B", //"#E3F0FA", // "#A1D1F4",
  colorText: "#c5cddb",
};

// Object with data about the current state of the game
const gameState = {
  gameStarted: false,
  activePlayer: player1,
  inactivePlayer: player2,
  currentRound: 1,
  correctAnswer: "",
};

// Color palette
const colors = {
  // categoryCards: "#60992D",
  categoryCardsInactive: "#86898b",
  // categoryCardsText: "#ecf0f1",
  categoryCardsTextInactive: "#525354",
  questionCard: "#47224A",
  questionCardAnswers: "#47224A",
  // questionCardAnswersHover: "#c0392b",
  questionCardAnswersCorrect: "#1d6b1e",
  questionCardAnswersWrong: "#7d3028",
  questionCardContinue: "rgb(220, 197, 222)",
  questionCardContinueInactive: "#47224A",
  playerOneCards: "",
  playerTwoCards: "",
};

// Global variables giving access to the player data entry form and the area with category cards
const playerData = document.getElementById("player-data-form");
const cards = document.getElementById("card-area");

// Global variable containing the active category card; it is set in cardClicked() and used in processAnswer()
let usedCard = "";

// Global event listeners for player name submission and quiz category selection
playerData.elements["submit"].addEventListener("click", validateNames);
for (let child of cards.children) {
  child.addEventListener("click", cardClicked);
}

// Set keyboard focus on input field for player 1 name
playerData.elements["p1"].focus();

/**
 * Checks whether the entered player names contain invalid characters:
 *  - If yes, the loading screen remains active until players enter valid names
 *  - If no, calls function initializePlayers()
 */
function validateNames(event) {
  event.preventDefault();
  let enteredName1 = playerData.elements["p1"].value;
  let enteredName2 = playerData.elements["p2"].value;
  // Validate player input (https://stackoverflow.com/questions/44256226/pattern-validation-with-javascript)
  let re = /^[a-zA-Z0-9._-]{1,10}$/;
  if (!re.test(enteredName1) || !re.test(enteredName2)) {
    document.getElementById("input-error").textContent =
      "Please only use letters, numbers, and the symbols . (dot), - (hyphen), _ (underscore) in your names. Name length must be between 1 and 10 characters.";
  } else {
    initializePlayers();
  }
  return;
}

/**
 * Start game by adding player names to player objects, hiding the loading screen
 * and showing the names and colors of the players in the game area.
 * Calls updatePlayerArea()
 */
function initializePlayers() {
  // Initialize player objects with names
  player1.name = playerData.elements["p1"].value;
  player2.name = playerData.elements["p2"].value;

  // Initial update of the player areas to show player names and colors
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

/**
 * Restarts the game while keeping the current players.
 * Resets colors, scores and round count.
 * Calls updatePlayerArea()
 */
function continueGame() {
  // Hide end game screen
  document.getElementById("end-game-screen").style.display = "none";
  document.getElementById("modal").style.display = "none";

  gameState.gameStarted = true;
  gameState.currentRound = 1;
  player1.score = 0;
  player2.score = 0;
  document.getElementById("p1-wins").textContent = player1.wins;
  document.getElementById("p2-wins").textContent = player2.wins;

  updatePlayerArea();

  for (let card of cards.children) {
    card.style.pointerEvents = "auto";
    card.style.backgroundColor = "";
    card.style.color = "";
    card.style.boxShadow = "";
  }
}

/**
 * Updates the areas to the left and right of the card area with current player data.
 * Highlights the active player.
 */
function updatePlayerArea() {
  document.getElementById("p1-score").textContent = player1.score;
  document.getElementById("p2-score").textContent = player2.score;

  let activePlayer = document.getElementById(gameState.activePlayer.id);
  let inactivePlayer = document.getElementById(gameState.inactivePlayer.id);

  // --- Highlight active player
  // Access html element with class active-player-note
  activePlayer.parentElement.nextElementSibling.textContent = "It's your turn!";
  activePlayer.parentElement.parentElement.style.backgroundColor =
    gameState.activePlayer.color;
  // activePlayer.parentElement.parentElement.style.border = "0.2em solid yellow";
  // activePlayer.parentElement.parentElement.style.boxShadow = "0 0 5px 8px #47224A";
  activePlayer.parentElement.parentElement.style.boxShadow =
    "0px 15px 25px rgba(71, 34, 74, 0.6), 0px 15px 15px rgba(71, 34, 74, 0.6)";
   
    if (window.innerWidth < 769) {
    activePlayer.parentElement.parentElement.style.display = "";
    inactivePlayer.parentElement.parentElement.style.display = "none";
  } else {
    activePlayer.parentElement.parentElement.style.display = "";
  }

  inactivePlayer.parentElement.nextElementSibling.textContent = "";
  inactivePlayer.parentElement.parentElement.style.backgroundColor =
    gameState.inactivePlayer.colorInactive;
  // inactivePlayer.parentElement.parentElement.style.border = "0.2em solid transparent";
  inactivePlayer.parentElement.parentElement.style.boxShadow = "none";
  return;
}

/**
 * Called whenever a player clicks on a category card.
 * Shows the question card and calls showQuestion().
 */
function cardClicked() {
  // --- Make sure the game has started to prevent players from accidentally clicking on cards
  if (gameState.gameStarted) {
    // Show the card that will be filled with the question and answers
    document.getElementById("modal").style.display = "block";
    document.getElementById("question-card").style.display = "flex";

    // Make sure the answers are clickable
    for (answer of document.getElementsByClassName("answer")) {
      answer.style.pointerEvents = "auto";
    }

    // Error handling: if the question cannot be loaded due to issues with the questions database,
    // redirect user to an error page
    try {
      showQuestion(this);
    } catch {
      self.location = "error.html";
    }

    // Make this category card unclickable (https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events)
    this.style.pointerEvents = "none";

    // Save this category card in a global variable for later use in processAnswer()
    usedCard = this;

    return;
  } else {
    return;
  }
}

/**
 * Selects a question to show to the player and fills the question card with
 * possible answers.
 * Calls processAnswer() once an answer has been clicked.
 */
function showQuestion(activeCard) {
  // --- Get a random question corresponding to the data-id of the clicked category card
  let categoryIndex = activeCard.getAttribute("data-id");
  let category = quizCategories[categoryIndex];
  let activeQuestion = category[Math.floor(Math.random() * category.length)];

  // TODO: try catch finally for reading the questions

  document.getElementById("question").textContent = activeQuestion.question;

  // --- Shuffle the answers
  let answerKeys = [0, 1, 2, 3];

  // Error handling: check if the answer array of the active question contains exactly 4 elements.
  // Log error to console.
  if (activeQuestion.answers.length != answerKeys.length) {
    console.log(
      `The question '${activeQuestion.question}' in category '${activeCard.textContent}' contains more or fewer answers than 4`
    );
  }

  for (answer of document.getElementsByClassName("answer")) {
    // Select random index to shuffle the display order of the answers
    let randomIndex = Math.floor(Math.random() * answerKeys.length);
    // Fill the quiz card with the answers from the quiz dictionary
    answer.textContent = activeQuestion.answers[answerKeys[randomIndex]];

    // Remember the element with the correct answer
    if (answerKeys[randomIndex] === activeQuestion.correctAnswer) {
      gameState.correctAnswer = answer.getAttribute("id");
    }
    // Remove the selected index from the list to make sure no answers are being selected multiple times
    answerKeys.splice(randomIndex, 1);

    // Listen for player clicking on an answer
    answer.addEventListener("click", processAnswer);
  }

  return;
}

/**
 * Checks if the selected answer is correct.
 * Updates the score and the category card colors accordingly.
 * Calls nextRound() once the player clicks on Continue.
 */
function processAnswer() {
  // --- Check if player has clicked on the correct answer
  if (this.getAttribute("id") === gameState.correctAnswer) {
    gameState.activePlayer.score += 100;
    // If correct:
    // Highlight the chosen answer green
    this.style.backgroundColor = colors.questionCardAnswersCorrect;
    // Show continue button
    document.getElementById("close-card").style.backgroundColor =
      colors.questionCardContinue;
    document.getElementById("close-card").style.cursor = "pointer";
    // Display the category card in the player's colors
    usedCard.style.backgroundColor = gameState.activePlayer.colorInactive;
    usedCard.style.color = gameState.activePlayer.colorText;
    usedCard.style.boxShadow = "none";
    usedCard.style.textShadow = "none";
  } else {
    // If wrong:
    // Highlight the incorrect answer red and the correct answer green
    this.style.backgroundColor = colors.questionCardAnswersWrong;
    document.getElementById(gameState.correctAnswer).style.backgroundColor =
      colors.questionCardAnswersCorrect;
    // Show continue button
    document.getElementById("close-card").style.backgroundColor =
      colors.questionCardContinue;
    document.getElementById("close-card").style.cursor = "pointer";
    // Display the category card in grey
    usedCard.style.backgroundColor = colors.categoryCardsInactive;
    usedCard.style.color = colors.categoryCardsTextInactive;
    usedCard.style.boxShadow = "none";
    usedCard.style.textShadow = "none";
  }

  // Make sure players can't click on other answers once an answer has been selected
  for (answer of document.getElementsByClassName("answer")) {
    answer.style.pointerEvents = "none";
    answer.removeEventListener("click", processAnswer);
  }

  // Listen for player clicking on Continue
  document.getElementById("close-card").addEventListener("click", nextRound);

  return;
}

/**
 * Switches to the next player, increments the round.
 * Calls endGame() once last round is reached.
 */
function nextRound() {
  // Hide question card and deactivate its button
  document.getElementById("question-card").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("close-card").removeEventListener("click", nextRound);

  // Reset the colors of answers on the question card
  for (answer of document.getElementsByClassName("answer")) {
    answer.style.backgroundColor = "";
  }
  document.getElementById("close-card").style.backgroundColor =
    colors.questionCardContinueInactive;
  document.getElementById("close-card").style.cursor = "";

  // Switch players
  gameState.activePlayer =
    gameState.activePlayer === player1 ? player2 : player1;
  gameState.inactivePlayer =
    gameState.inactivePlayer === player2 ? player1 : player2;
  // Increment current round by 1
  gameState.currentRound += 1;

  updatePlayerArea();

  // Check if current round is last round and call endGame()
  if (gameState.currentRound === 10) {
    endGame();
  }

  return;
}

/**
 * Processes the end of the game by displaying the results.
 * Allows players to continue playing by calling continueGame() or to reset the game for new players by reloading the page.
 */
function endGame() {
  gameState.gameStarted = false;
  document.getElementById("end-game-screen").style.display = "flex";
  document.getElementById("modal").style.display = "block";

  // Compare the player scores and update the end game screen accordingly
  if (player1.score === player2.score) {
    document.getElementById(
      "results"
    ).innerHTML = `It's a draw! Play again to see who's better!`;
  } else {
    let winner = player1.score > player2.score ? player1 : player2;
    winner.wins += 1;
    document.getElementById(
      "results"
    ).innerHTML = `Congrats to <br class="show-on-mobile" /><span id="winner">${winner.name}</span><br>You won this round!`;
    document.getElementById("winner").style.color = winner.colorText;
  }

  document.getElementById("results").innerHTML += `
  <br><br>Stats:<br><br>
  <table>
  <tr>
    <th>Player</th>
    <th>This round's score</th>
    <th>Total wins</th>
  </tr>
  <tr>
    <td>${player1.name}</td>
    <td>${player1.score}</td>
    <td>${player1.wins}</td>
  </tr>
  <tr>
    <td>${player2.name}</td>
    <td>${player2.score}</td>
    <td>${player2.wins}</td>
  </tr>
</table>
`;

  // Listen for players clicking on Continue or Restart
  document
    .getElementById("restart-same")
    .addEventListener("click", continueGame);
  document.getElementById("restart-new").addEventListener("click", () => {
    location.reload();
  });
}
