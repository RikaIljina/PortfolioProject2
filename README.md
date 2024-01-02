# What d'you know - A Quiz for Two

[Live link to the game](https://rikailjina.github.io/PortfolioProject2/)

This project is a website with one page that allows the users to play a trivia quiz game in local multiplayer on one device, thereby testing their general knowledge and learning new facts about the world.

The website is fully responsive across multiple devices.
![Website view on different devices](assets/readme_files/readme_mockup_responsive.png)

## Table of Contents

- [UX](#ux)
  - [Target audience](#target-audience)
  - [User stories](#user-stories)
- [Design](#design)
  - [Color scheme](#color-scheme)
  - [Typography](#typography)
  - [Images](#images)
- [Features](#features)
  - [Game loop](#game-loop)
  - [Codebase](#codebase)
    - [File structure](#file-structure)
    - [Flowchart](#flowchart)
    - [Mechanics](#mechanics)
  - [Future features](#future-features)
  - [Known bugs](#known-bugs)
- [Technologies](#technologies)
  - [Main Languages](#main-languages)
  - [Frameworks, Libraries, Applications](#frameworks-libraries-applications)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

## UX

### Target audience

The target audience for the game are English-speaking teenagers and adults who enjoy trivia games and want to play against a local human opponent.

The goal is to engage two people in a fun quiz game for an unspecified amount of time and encourage them to come back for even more questions to ruminate on and more new facts to learn.

### User stories

As a website visitor, I want to be able to 

- quickly understand what the website is about
- understand how to start the game
- easily understand the game loop 

## Design

When choosing a design for my game, I prioritized clearness and readability to make sure all important information was visible and easily readable to the players at all times and on different screen sizes. At the same time, I chose to implement different colors to give the game a fun and colorful feeling.

The header with the game title and the footer with copyright info are designed to be unobtrusive as to not draw attention away from the main game area.

![Fullscreen view of the game area](assets/readme_files/readme_design_fullscreen.png)

The layout of the game area is slightly different on mobiles and on larger screens:

- On mobiles, the area containing the active player name, their score and the note "It's your turn" is displayed at the top. The area of the inactive player is hidden. Below the player area is the card area with two or three columns, depending on the phone size. The dialog with the quiz question that appears after clicking on a card fills the entire phone screen.
- On larger screens, the card area takes up most space in the middle of the screen and the two player areas are to the left and right of the card area. The dialog with the quiz question only fills a small percentage of the screen. A light, translucent modal fills the space behind it, preventing the user from interacting with the background.

<img src="assets/readme_files/readme_design_mobile.png" width="300" alt="Game area on small mobile screens">

All game elements that are clickable but do not intuitively look like buttons (category cards, answers) have a box shadow that slightly lifts them up from the background. Once they become unclickable, the shadow disappears to convey to the players that they are no longer interactive.

If desired by the players, the game can be played with keyboard input only by using `TAB` to cycle through elements and `ENTER` to select them.

### Color scheme

![Game palette](assets/readme_files/readme_palette.png)

I chose three main colors for the game area:

- Violet - header, footer, 9 category cards, quiz card, loading screen, end game screen
- Dark moss green - player 1 background
- Delft blue - player 2 background

Each of those colors has a much lighter equivalent that I use for the text:

- Magnolia - for text on Violet
- Ivory - for text on Dark moss green
- Ghost white - for text on Delft blue

These color combinations have been checked with the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker) to make sure the contrast ratio is sufficient.

The remaining colors are:

- Battleship gray and Davy's gray - for neutral, inactive category cards that cannot be clicked on anymore
- Dark spring green - to highlight correct answers
- Burnt umber - to highlight wrong answers

Since this is a two-player game, each player has their own color that is used in that player's area. Whenever a player answers the question of a specific category card correctly, that card also receives that player's color. Cards whose answers have been answered incorrectly, receive a neutral gray color. That way, the players have an additional clue as to who is leading, beside the score in the player areas.

![Fullscreen view of the game area showing inactive cards in their respective colors](assets/readme_files/readme_design_cardarea.png)

On the quiz cards, correct answers are highlighted green and wrong answers are highlighted red, which corresponds to the conventional use of color coding for "wrong" and "right". However, since these colors might present a barrier to people with color vision deficiency, the wrong answer is also marked by a line-through.

<img src="assets/readme_files/readme_design_quizcard.png" width="300" alt="Quiz card with the correct and the wrong answers highlighted">

### Typography

I chose to have a single font for all game elements to make it less confusing. The font used is [Acme](https://fonts.google.com/specimen/Acme), downloaded from [Google Fonts](https://fonts.google.com/).

<img src="assets/readme_files/readme_font_acme.png" width="500" alt="Font Acme">

### Images

A trophy cup is displayed on the end game screen next to the winning player.

I did not use many images in the game due to time restrictions, though I do believe that a few well-placed graphics would improve the overall look-and-feel of the game. This is a consideration for a future update.

## Features

### Game loop

After the webpage has loaded, the user is presented with a loading screen providing a short description of the game and two input fields for the player names. This is where the user starts interacting with the game.

1. The user enters the names of the two players and clicks on "Start".
2. In case the player names are not consistent with the pattern for valid names, a notification is shown to the user explaining the rules for name selection.
3. Once the user has chosen two valid names, the loading screen disappears and the game area becomes visible.
4. The game area consists of 9 cards, each showing the name of a quiz category. The active player, who is marked as such with the string "It's your turn" under their name, selects one category and clicks on it.
5. A quiz card with a random question from the chosen category along with four clickable answers is shown to the player.
6. The player clicks on an answer and receives feedback in form of color coding - green for a correct answer, red for an incorrect answer.
7. Was the answer incorrect, the correct answer is highlighted green.
8. The player clicks on the button "Continue" that is shown in the lower part of the card after an answer has been chosen.
9. The quiz card is hidden and the game area is visible again, this time with the second player marked as active player by the string "It's your turn". The already used category card is colored either in gray (in case of a wrong answer) or in the previous player's color (in case of a correct answer).
10. The game loop continues at step 4 for the second player.
11. The steps 4 to 10 are repeated nine times, until no category cards remain active. At that point, an end game screen is shown to the players that contains the name of the winning player as well as a table with the player names, their respective scores for this round and the amount of total wins so far. Below that information, two buttons allow the players to take action:
    - "Next round" - allows the players to continue at step 4 with new questions and all category cards reset. Their progress will be saved.
    - "New game" - allows the players to restart the game for new players. All progress is lost.

### Codebase

#### File structure

- `index.html` - main HTML file with the game elements
- `error.html` - an error page to be shown in case there is an issue with the database and questions cannot be retrieved
- `assets/css/style.css` - styles for the entire site
- `assets/favicons` - folder containing the site icons
- `assets/images` - folder containing the image files
- `assets/readme_files` - folder containing the readme screenshots
- `assets/js/questions.js` - database file containing nine arrays with question objects for the nine categories as well as an array containing the quiz category names and their respective array lengths
- `assets/js/script.js` - script file containing the game code

#### Flowchart

<details>
<summary>Flowchart depicting the progression of actions and processes</summary>

![Flowchart depicting the progression of actions and processes](assets/readme_files/readme_flowchart.png)

</details>

#### Mechanics

**Scope:**

Considering that it is seen as bad practice in JavaScript to have global variables that can accidentally be overwritten, but also having the need for variables that can be accessed by different functions, I decided to declare global objects with the `const` keyword to make sure they cannot be reassigned. Among those objects are `player1` and `player2` that contain all data pertaining to the relevant player as well as the `gameState` object containing all data on the game progress and the current round.

I use the `let` keyword for all variables within functions to keep them in their respective scopes.

**Event handling:**

Event listeners set globally only persist througout the entire game loop if they are constantly needed, as is the case for the event listeners on the 9 category cards. Other event listeners that are required only once or are confined to certain functions are removed as soon as they are no longer needed to prevent unexpected behavior in the game.

**Questions database:**

The file `questions.js` contains the database from which the quiz questions and answers are retrieved. For each of the 9 categories, there is one array containing multiple objects. The format of the array is as follows:

```
const quizQuestionsCategoryName = [
  {
    question: "Question shown to the player",
    answers: [
      "Correct Answer",
      "Answer b",
      "Answer c",
      "Answer d",
    ],
    correctAnswer: 0,
  },
  ...
  ]
```

Additional quiz questions must be added in the exact same format.

The file also contains the array `quizCategories` which is needed to access the correct category array whenever the player clicks on a category card. The format of this array is as folows:

```
const quizCategories = [
  [quizQuestionsCategoryName, quizQuestionsCategoryName.length],
  ...
]
```

The array contains exactly 9 subarrays and their indexes must correspond to the values of the attribute `data-id` of the `div` elements inside the div container `card-area` in `index.html`. For example, since the `div` of the category card "Tech" has the attribute `data-id="0"`, the array `[quizQuestionsTech, quizQuestionsTech.length]` must be found at index 0 of the array `quizCategories` to ensure correct data retrieval.

**Non-repetitive randomness:**

I wanted to make sure that players who play multiple consecutive rounds do not encounter the same question several times (unless, of course, they play more times than there are questions). To that end, I implemented the following process:

Instead of randomly selecting one question from the array and then risking its repeated selection next round, I wanted to select a random index to retrieve the question with and then remove that index from an individual list of indexes pertaining to each category. For that, I needed editable arrays with exactly as many index numbers from 0 to n as there are question objects in the corresponding category array.

The following code takes care of that:

```
const questionKeys = {};
for (let i = 0; i < quizCategories.length; i++) {
  questionKeys[i] = [...Array(quizCategories[i][1]).keys()];
}
```

`quizCategories.length` is 9, since there are 9 categories. `quizCategories[i][1]` is the length of each category array. Using spread syntax, I create 9 subarrays with indexes ranging from 0 to n, where n is the length of each category array minus 1.

Then, in the function `showQuestion()`, I use `Math.random()` to generate a random index for the `questionKeys` array:

```
let randomIndexQ = Math.floor(Math.random() * questionKeys[categoryIndex].length);
```

The question to be shown to the player is chosen based on that index.

Finally, I have to make sure that the used index number is either removed from the `questionKeys` array, or that the array is reset before there are no more indexes to retrieve:

```
  if (questionKeys[categoryIndex].length === 1) {
    questionKeys[categoryIndex] = [...Array(quizCategories[categoryIndex][1]).keys()];
  } else {
    questionKeys[categoryIndex].splice(randomIndexQ, 1);
  }
```

I use the same method to shuffle the answers on the quiz cards, thus making sure that the correct question is not always shown on top.

**Error handling:**

**Input issues**

Since I allow direct user input of a string on my website, I need to make sure that the user doesn't input anything malicious or anything that could break the readability of the page text. Therefore, I implemented two types of checks for the input fields `p1` and `p2`:

- the attribute `maxlength="10"` in the HTML of the input fields to spare the users the trouble of putting in too many characters before being notified of a limit
- the function `validateNames()` that tests the input against the `regex` string `/^[a-zA-Z0-9._-]{1,10}$/`, allowing only latin letters, numbers and the characters `._-`

The game displays the loading screen for as long as the input is invalid and only proceeds to `initializePlayers()` once it has received valid player names. The players are notified of the requirements on the loading screen.

**Database issues**

A grave error that would make the game unplayable is a corrupted database. Whenever the script tries to access data from the database file `questions.js`, it runs through a `try ... catch` process:

```
try {
  ...
} catch {
  self.location = "error.html";
}
```

If

- the script file `questions.js` is inaccessible,
- the array `quizCategories` in that file contains incorrect values,
- or the arrays containing questions and answers for one or more quiz category are missing or empty,

then the page `error.html` is loaded, notifying the user of the issue and suggesting to contact the dev or to try and reload the index page.

The following errors could arise without fully breaking the game:

- There could be fewer or more answers in the answer array of the active question object than 4
- The key `answers` with the entire answers array could be missing
- The key `question` could be missing
- the key `correctAnswers` could be missing or not be an integer between 0 and 3

While these errors make the active quiz card unsolvable, they do not completely break the game. Therefore, I decided to use the `try ... catch` block in these cases to notify the player of a corrupted question, log the detailed error message to the console, and skip the offending category card this round.

Preferably, the integrity of the file `questions.js` would be tested and ascertained before deployment and after each update, so the user would never have to encounter any of those database errors.

### Future features

The following features could be implemented in future updates:

- [ ] Add graphics for each category and on the loading and end game screens to make them look more interesting
- [ ] Add a timer on quiz cards to limit the time players can think about a question 
- [ ] Implement user authentication and let users access their personal profiles
- [ ] Add an all-time highscore to show players with most wins
- [ ] Add statistics to show how knowledgable a user is in what categories
- [ ] Add an online multiplayer

### Known bugs

See [TESTING.md](TESTING.md) for testing documentation

## Technologies

### Main Languages

- HTML5
- CSS3
- JavaScript (ECMAScript 2023)

### Frameworks, Libraries, Applications

- [Git](https://git-scm.com/): version control via VS Code terminal
- [GitHub](https://github.com/): project storage and submission
- Chrome DevTools: debugging and responsiveness checks
- [Google Fonts](https://fonts.google.com/): all site fonts
- [Coolors](https://coolors.co): choice of palette
- [WebAIM](https://webaim.org/resources/contrastchecker/): contrast check
- [amiresponsive](https://ui.dev/amiresponsive): responsiveness mock-up
- VS Code: IDE
- [OpenAI ChatGPT](https://openai.com/): help with creating quiz questions

## Testing

Tests are described in [TESTING.md](TESTING.md).

## Deployment

### Pushing to GitHub

1. Login to GitHub.com and create a new empty project repository
2. Create the local project in VS Code
3. Initialize the repository by opening a terminal in VS Code and entering the command  `git init --initial-branch=main`
4. Add all project files to the repository with the command `git add .`
5. Commit all added files with the command `git commit -m "Initial commit"`
6. Create new remote with the command `git remote add origin https://github.com/[UserName]/[RepoName].git`
7. Push the files to the remote repository on GitHub with the command `git push -u origin main` 

### GitHub Pages

The website was deployed to GitHub Pages. Deployment process:

1. Login to GitHub.com and open project repository
2. Click on "Settings"
3. In the left panel, select "Pages"
4. Under "Build and Deployment" - "Source", select "Deploy from a branch" and select the main branch
5. Once the deployment is finished, the link to the page is shown at the top of the GitHub Pages section
6. The live link can be found [here](https://rikailjina.github.io/PortfolioProject2/)

### Forking the GitHub Repository

By forking the GitHub Repository, you can make a copy of the original repository in your GitHub account. There, you can view and/or make changes to the repo without affecting the original.

1. Log in to GitHub and locate the GitHub Repository.
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the GitHub Repository.
2. At the top of the Repository, click on the "<> Code" button.
3. To clone the repository using HTTPS, copy the link under "HTTPS".
4. Open Git Bash or the VS Code terminal.
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.
7. Press Enter. Your local clone will be created.

## Credits

### Code used

All code was written by me unless clearly stated otherwise.

Beside the Code Institute learning materials and sample files, I also used the following reference materials:

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [W3 Schools](https://www.w3schools.com/js/default.asp)
- [Stackoverflow](https://stackoverflow.com/)

The following sources provided me with important information that helped me greatly with implementing certain functionality:
- [How to set and remove pointer events](https://stackoverflow.com/questions/16492401/javascript-setting-pointer-events)
- [How to create a consecutive array of numbers from a range](https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp)
- [How to test a string against regex in JavaScript](https://stackoverflow.com/questions/44256226/pattern-validation-with-javascript)
- [How to write a good README](https://github.com/kera-cudmore/readme-examples/tree/main)

### Content

Most of the quiz questions have been generated by [OpenAI ChatGPT](https://openai.com/). Some of them are my own.

### Media

 - [Flaticon](https://www.flaticon.com/free-icons/sports-and-competition)

### Acknowledgments

- Many thanks to my mentor for constructive feedback.
- Many thanks to friends and family who did some of the testing.
- Many thanks to the Code Institute slack community for constant and general support.
