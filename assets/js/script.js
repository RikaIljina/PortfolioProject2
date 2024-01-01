// Player objects with all player-related data
const player1 = {
  name: "",
  score: 0,
  wins: 0,
  id: "p1-name",
  color: "#3B5124",
  colorText: "#ECFFD8",
};
const player2 = {
  name: "",
  score: 0,
  wins: 0,
  id: "p2-name",
  color: "#26334B",
  colorText: "#c5cddb",
};

// Object with data about the current state of the game
const gameState = {
  gameStarted: false,
  activePlayer: player1,
  inactivePlayer: player2,
  currentRound: 1,
  correctAnswer: "",
  usedCard: "",
};

// Color palette
const colors = {
  categoryCardsInactive: "#86898b",             // Grey for used cards
  categoryCardsTextInactive: "#525354",         // Dark grey for text on used cards
  questionCardAnswersCorrect: "#1d6b1e",        // Green for correct answers
  questionCardAnswersWrong: "#7d3028",          // Red for wrong answers
  questionCardAnswersText: "#f2ebf2",           // Light magenta for better text contrast on highlighted answers
  questionCardContinue: "#f2ebf2",              // Light blue for button to close quiz card 
};

// Global object containing editable arrays with question indexes corresponding to 
// quiz categories from file 'questions.js'. Needed to choose random questions 
// that do not repeat within a game unless every question has been used once.
// quizCategories[i][1] denotes the length of the array. The generated question keys
// are consecutive integers ranging from 0 to n, where n is the length of the 
// corresponding question array minus one. 
// My reference for the usage of spread syntax:
// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp

const questionKeys = {};
try {
  for (let i = 0; i < quizCategories.length; i++) {
    questionKeys[i] = [...Array(quizCategories[i][1]).keys()];
  }
} catch {
  self.location = "error.html";
}

// Global variables giving access to the player data entry form on the loading screen
// and the area with category cards
const playerData = document.getElementById("player-data-form");
const cards = document.getElementById("card-area");

// Global event listeners for player name submission and quiz category selection
playerData.elements["submit"].addEventListener("click", validateNames);
for (let child of cards.children) {
  child.addEventListener("click", cardClicked);
}

// Global event listener that makes sure the player area is always correctly displayed/hidden
// when the user decides to resize the window. The function adjustForWindowSize() is also
// called once in updatePlayerArea().
window.addEventListener(
  "resize", () => {
    adjustForWindowSize(
      document.getElementById(gameState.activePlayer.id),
      document.getElementById(gameState.inactivePlayer.id)
    )
  }
);

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
      "Please only use latin letters, numbers, and the symbols . (dot), - (hyphen), _ (underscore) in your names. Name length must be between 1 and 10 characters.";
  } else {
    initializePlayers();
  }
  return;
}

/**
 * Starts game by saving player names to player objects, hiding the loading screen
 * and showing the names and colors of the players in the game area.
 * Calls updatePlayerArea()
 */
function initializePlayers() {
  playerData.elements["submit"].removeEventListener("click", validateNames);
  // Initialize player objects with names
  player1.name = playerData.elements["p1"].value;
  player2.name = playerData.elements["p2"].value;

  // Initial update of the player areas to show player names and colors
  document.getElementById("p1-name").textContent = player1.name;
  document.getElementById("p2-name").textContent = player2.name;

  document.getElementById("player-1").style.backgroundColor = player1.color;
  document.getElementById("player-2").style.backgroundColor = player2.color;

  // Highlight active player
  updatePlayerArea();

  // Hide loading screen and modal
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("modal").style.animation = "none";
  document.getElementById("modal").style.display = "none";


  // Declare game as started
  gameState.gameStarted = true;

  return;
}

/**
 * Restarts the game while keeping the current players.
 * Resets styles, scores and round count.
 * Calls updatePlayerArea()
 */
function continueGame() {
  // Hide end game screen
  document.getElementById("end-game-screen").style.display = "none";
  document.getElementById("modal").style.animation = "none";
  document.getElementById("modal").style.display = "none";

  // Declare game as started
  gameState.gameStarted = true;
  gameState.currentRound = 1;
  player1.score = 0;
  player2.score = 0;
  document.getElementById("p1-wins").textContent = player1.wins;
  document.getElementById("p2-wins").textContent = player2.wins;

  // Highlight active player
  updatePlayerArea();

  // Reset category card styles
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

  // Update html element with class 'active-player-note' below the players' names 
  activePlayer.parentElement.nextElementSibling.textContent = "It's your turn!";
  inactivePlayer.parentElement.nextElementSibling.textContent = "";

  // Make sure the inactive player area is hidden on mobiles
  adjustForWindowSize(activePlayer, inactivePlayer);

  return;
}

/**
 * Checks the window size and hides the inactive player area
 * on mobile devices
 */
function adjustForWindowSize(activePlayer, inactivePlayer) {
  if (window.innerWidth < 769) {
    activePlayer.parentElement.parentElement.style.display = "";
    inactivePlayer.parentElement.parentElement.style.display = "none";
  } else {
    inactivePlayer.parentElement.parentElement.style.display = "";
  }
}

/**
 * Called whenever a player clicks on a category card.
 * Displays the quiz card and calls showQuestion().
 */
function cardClicked() {
  // Make sure the game has started to prevent players from accidentally clicking on cards
  if (gameState.gameStarted) {
    // Show the card that will be filled with the question and answers
    document.getElementById("modal").style.display = "block";
    document.getElementById("quiz-card").style.display = "flex";

    // Make sure the answers are clickable
    for (let answer of document.getElementsByClassName("answer")) {
      answer.style.pointerEvents = "auto";
    }

    // Make this category card unclickable (https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events)
    this.style.pointerEvents = "none";

    // Save this category card in a global variable for later use in processAnswer()
    gameState.usedCard = this;

    // Error handling: if the question cannot be loaded due to issues with the questions database,
    // redirect user to an error page
    try {
      showQuestion(this);
    } catch {
      self.location = "error.html";
    }
    return;
  } else {
    return;
  }
}

/**
 * Selects a question to show to the player and fills the quiz card 
 * with possible answers.
 * Calls processAnswer() once an answer has been clicked.
 */
function showQuestion(activeCard) {
  // The attribute 'data-id' of the card elements is an integer in range 0-9 and corresponds
  // to the category indexes of the 'quizCategories' array.
  // See 'questions.js' for info on the format of 'quizCategories'
  let categoryIndex = activeCard.getAttribute("data-id");
  let category = quizCategories[categoryIndex][0];
  // Generate random index based on the amount of questions in the corrseponding category 
  let randomIndexQ = Math.floor(Math.random() * questionKeys[categoryIndex].length);
  // Select the question with the generated index
  let activeQuestion = category[questionKeys[categoryIndex][randomIndexQ]];

  // Array with indexes for shuffling the answers
  let answerKeys = [0, 1, 2, 3];

  // Error handling:
  // make sure the variable 'activeQuestion' contains the 'answers' array,
  // that the answer array of the active question contains exactly 4 elements,
  // that the active question has a 'question' key,
  // and that the active question has a 'correctAnswers' key that is a number between 0 and 3. 
  // Log error to console and notify the user.
  try {
    if (!activeQuestion.answers) {
      throw [`The question '${activeQuestion.question}' at index '${randomIndexQ}' in category '${activeCard.textContent}' does not contain an 'answers' array.`, 'Sorry, this question seems to be broken... Details can be found in the console. Please contact the dev and report the bug.'];
    } else if (activeQuestion.answers.length != answerKeys.length) {
      throw [`The question '${activeQuestion.question}' at index '${randomIndexQ}' in category '${activeCard.textContent}' contains more or fewer answers than 4`, 'Sorry, this question seems to be broken... Details can be found in the console. Please contact the dev and report the bug.'];
    }
    if (!activeQuestion.question) {
      throw [`The question at index '${randomIndexQ}' in category '${activeCard.textContent}' does not have a 'question' key`, 'Sorry, this question seems to be broken... Details can be found in the console. Please contact the dev and report the bug.'];
    }
    if (isNaN(activeQuestion.correctAnswer) || !(0 <= activeQuestion.correctAnswer <= 3)) {
      throw [`The question '${activeQuestion.question}' in category '${activeCard.textContent}' does not have a 'correctAnswer' key`, 'Sorry, this question seems to be broken... Details can be found in the console. Please contact the dev and report the bug.'];
    }
  } catch (err) {
    errorHandling(err);
    return;
  }

  // If a category is running out of new questions, reset the questionKeys array
  // for this category to include all initial indexes for the question objects
  // and start re-using the questions
  if (questionKeys[categoryIndex].length === 1) {
    questionKeys[categoryIndex] = [...Array(quizCategories[categoryIndex][1]).keys()];
  } else {
    // Remove the generated index from the questionKeys array to make sure
    // no questions are being selected repeatedly within a game
    questionKeys[categoryIndex].splice(randomIndexQ, 1);
  }

  // Display question on card
  document.getElementById("question").textContent = activeQuestion.question;

  // Shuffle the answers
  for (let answer of document.getElementsByClassName("answer")) {
    // Generate random index to shuffle the display order of the answers
    let randomIndex = Math.floor(Math.random() * answerKeys.length);
    // Fill the quiz card with the answers from the quiz object
    answer.textContent = activeQuestion.answers[answerKeys[randomIndex]];

    // Remember the element with the correct answer
    if (answerKeys[randomIndex] === activeQuestion.correctAnswer) {
      gameState.correctAnswer = answer.getAttribute("id");
    }
    // Remove the generated index from the list to make sure no answers are being selected multiple times
    answerKeys.splice(randomIndex, 1);

    // Listen for player clicking on an answer
    answer.addEventListener("click", processAnswer);
  }

  return;
}

/**
 * Handles database errors that do not break the game by notifying the user,
 * deactivating the category card with the offending question and
 * moving on to the next player.
 */
function errorHandling([consoleMsg, alertMsg]) {
  console.log(consoleMsg);
  alert(alertMsg);
  gameState.usedCard.style.backgroundColor = colors.categoryCardsInactive;
  gameState.usedCard.style.color = colors.categoryCardsTextInactive;
  gameState.usedCard.style.boxShadow = "none";
  nextRound();
  return;
}

/**
 * Checks if the selected answer is correct.
 * Updates the score and the category card colors accordingly.
 * Calls nextRound() once the player clicks on Continue.
 */
function processAnswer() {
  // Check if player has clicked on the correct answer
  if (this.getAttribute("id") === gameState.correctAnswer) {
    // If correct:
    // Increment player score
    gameState.activePlayer.score += 100;
    // Highlight the chosen answer green
    this.style.backgroundColor = colors.questionCardAnswersCorrect;
    this.style.color = colors.questionCardAnswersText;
    // Show continue button
    document.getElementById("close-card").style.color =
      colors.questionCardContinue;
    document.getElementById("close-card").style.pointerEvents = "auto";
    document.getElementById("close-card").style.cursor = "pointer";
    // Display the category card in the player's colors
    gameState.usedCard.style.backgroundColor = gameState.activePlayer.color;
    gameState.usedCard.style.color = gameState.activePlayer.colorText;
    gameState.usedCard.style.boxShadow = "none";
  } else {
    // If wrong:
    // Highlight the incorrect answer red and the correct answer green
    this.style.backgroundColor = colors.questionCardAnswersWrong;
    this.style.textDecoration = "line-through";
    this.style.color = colors.questionCardAnswersText;
    document.getElementById(gameState.correctAnswer).style.transition =
      "all 0.7s";
    document.getElementById(gameState.correctAnswer).style.backgroundColor =
      colors.questionCardAnswersCorrect;
    document.getElementById(gameState.correctAnswer).style.color =
      colors.questionCardAnswersText;
    // Show continue button
    document.getElementById("close-card").style.color =
      colors.questionCardContinue;
    document.getElementById("close-card").style.pointerEvents = "auto";
    document.getElementById("close-card").style.cursor = "pointer";
    // Display the category card in grey
    gameState.usedCard.style.backgroundColor = colors.categoryCardsInactive;
    gameState.usedCard.style.color = colors.categoryCardsTextInactive;
    gameState.usedCard.style.boxShadow = "none";
  }

  // Make sure players can't click on other answers once an answer has been selected
  for (let answer of document.getElementsByClassName("answer")) {
    answer.style.pointerEvents = "none";
    answer.removeEventListener("click", processAnswer);
    answer.style.boxShadow = "none";
  }

  // Listen for player clicking on Continue before starting next round
  document.getElementById("close-card").addEventListener("click", nextRound);

  return;
}

/**
 * Switches to the next player, increments the round.
 * Calls endGame() once last round is reached.
 */
function nextRound() {
  // Hide quiz card and deactivate its button
  document.getElementById("quiz-card").style.display = "none";
  document.getElementById("modal").style.animation = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("close-card").removeEventListener("click", nextRound);
  document.getElementById("close-card").style.color = "";
  document.getElementById("close-card").style.cursor = "";
  document.getElementById("close-card").style.pointerEvents = "none";

  // Reset the styles of answers on the quiz card
  for (let answer of document.getElementsByClassName("answer")) {
    answer.style.backgroundColor = "";
    answer.style.color = "";
    answer.style.boxShadow = "";
    answer.style.transition = "all 0.3s";
    answer.style.textDecoration = "none";
  }

  // Switch players
  gameState.activePlayer =
    gameState.activePlayer === player1 ? player2 : player1;
  gameState.inactivePlayer =
    gameState.inactivePlayer === player2 ? player1 : player2;

  // Increment current round by 1
  gameState.currentRound += 1;

  // Highlight active player
  updatePlayerArea();

  // Check if current round is last round and call endGame()
  if (gameState.currentRound === 10) {
    endGame();
  }

  return;
}

/**
 * Processes the end of the game by displaying the results.
 * Allows players to continue playing by calling continueGame() 
 * or to reset the game for new players by reloading the page.
 */
function endGame() {
  // Declare game as finished
  gameState.gameStarted = false;
  // Show end game screen
  document.getElementById("end-game-screen").style.animation = "fadeIn 3s";
  document.getElementById("modal").style.animation = "fadeIn 3s";
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
