# "What d'you know" - Testing

## CONTENTS

- [AUTOMATED TESTING](#automated-testing)
  - [W3C Validator](#w3c-validator)
  - [Lighthouse](#lighthouse)
  - [WAVE](#wave)
- [MANUAL TESTING](#manual-testing)
  - [Testing User Stories](#testing-user-stories)
  - [Full Testing](#full-testing)
- [BUGS](#bugs)
  - [Known bugs](#known-bugs)
  - [Solved bugs](#solved-bugs)

## Automated Testing

### W3C Validator

Testing the HTML code with [W3C Markup Validation Service](https://validator.w3.org/):
| File | Result |
|------|--------|
| index.hmtl | Pass |
| error.html | Pass |

Testing the CSS code with [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator):
| File | Result |
|------|--------|
| style.css | Pass |

Testing the JavaScript code with [JSHint](https://jshint.com/):
| File | Result |
|------|--------|
| script.js | No errors |
| questions.js | No errors |

### Lighthouse

Mobile:

Desktop:


### Wave

## Manual Testing

### Testing user stories

| Goals | How are they achieved? |
|---|---|
| quickly understand what the website is about | Visitors are greeted by a Welcome screen which contains a short game description - a "How-to-play". |
| understand how to start the game | The Welcome screen contains two clearly marked input fields for the player names and a Start button. |
| easily understand the game loop  | A "It's your turn" string clearly marks the player whose turn it is. Only game-relevant elements can be interacted with and the game design with selectable categories and a quiz card with a question and four clickable answers is intuitive and self-explanatory. |
| **Possible user behaviour**| **Feedback from the game** |
| User enters names with invalid characters or no characters at all | Below the player name input fields, a note is shown to the player explaining the limitations for player name input. |
| User selects a category card | A quiz card is shown, containing a question and four answers. |
| User selects an answer | The answer is checked and feedback is given in form of colors and a strike-through for wrong answers. A "Continue" button is shown to the user. |
| User tries selecting a different answer | The answers are no longer interactive and do not react to hover or click actions. |
| User clicks on "Continue" | The quiz card disappears. The "It's your turn" string clearly marks the next player whose turn it is. The used category card is shown as inactive. |
| User tries clicking on a used category card | The card does not react to hover or click actions. |
| User answers the last available quiz question and clicks on "Continue" | An end game screen is shown, containing the player scores and wins as well as two buttons: "Next Round" and "New Game" |
| User clicks on "Next Round" | The end game screen disappears, all category cards are reset and the active player is marked in the game area. The players can continue the game. |
| User clicks on "New Game" | The game is reloaded. All current player progress is lost. |
| User reloads the page | The game is reloaded. All current player progress is lost. |
| User clicks on the "Feedback" link in the footer | The user's default mail program opens and creates an empty email message with the developer's email address as recipient. |
| User encounters the error page | The user can read about the possible reasons for the error and click on one of two links: "Try reloading the start page" to reload the game and see if the error persists, or "Report error to the dev", to open the default mail program and create an an empty email message with the developer's email address as recipient. |

### Full Testing

The website was tested on:
 - Laptop: 
    - HP EliteBook x360 1030 G3 13.3''
 - Mobile devices:
    - Huawei P20
    - Samsung S8
    - Samsung S9

On the laptop, the site was tested in the following browsers:
 - Chrome
 - Opera
 - Microsoft Edge

On mobiles, the site was tested in:
 - Chrome

The site was also tested to be responsive on different screen sizes using Google Chrome Developer Tools. 

The following features were thoroughly tested:

| Feature | Result |
|---|---|
| The entire game is playable with keyboard only, without mouse or touch | Pass |
| Player name input fields accept only the allowed character set | Pass |
| Currently non-interactive elements do not accidentally react to user input, do not exhibit click/hover/focus/pointer behaviour, and are clearly marked as non-interactive | Pass |
| When clicked on, each category card exclusively shows questions from the relevant category | Pass |
| The answer highlighted "green" is always the correct answer | Pass |
| Questions do not repeat throughout one game, provided there are more questions than the players play rounds | Pass |
| Once all questions have been used, they are reshuffled and re-used without causing errors due to inaccessible indexes | Pass |
| Clicking on the Start and Reset buttons has the desired outcome, setting and resetting all relevant variables such as scores, interactivity, visibility, and styles | Pass |
| In case of database errors, the error handling functionality kicks in and notifies the user about the nature of the error | Pass |

## Bugs

### Solved bugs

The following issues came up during the testing process and were fixed:

| Issue | Fix |
|---|---|
| The [WAVE report](https://wave.webaim.org/) showed that I had no headings in my HTML | Added appropriate headings for a clearer HTML structure |
| The [WAVE report](https://wave.webaim.org/) showed contrast errors | Changed the text colors for better contrast |
| I realized that my game was only playable with mouse/touch input, not with keyboard, making it less accessible for certain users. |  1. In HTML, I changed all interactive elements to have the tag `button` instead of `div` or `p`. <br> 2. In the script file, I added code to enable/disable the buttons depending on the stage of the game and the visible screen to make sure hidden elements were not accessible via `TAB` key. <br> 3. In the CSS file, I adjusted styles to make sure focused elements were visible as such. |


### Known bugs

| Issue | Fix attempt |
|---|---|
| I allow users to enter max 10 characters as player names. On some devices (tablets and smaller latops), if players choose long names, especially with braod characters such as "M" or "W", this leads to the player areas taking up too much space in the game area since they display the entire player name. | I haven't settled on a fix yet. In the future, I might limit the player name length even more or choose a narrow font. |
