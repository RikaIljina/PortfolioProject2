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

  - [Known Bugs](#known-bugs)
  - [Solved Bugs](#solved-bugs)

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

## Bugs

### Fixed

The following issues came up during the testing process and were fixed:

| Issue | Fix |
|---|---|
| The [WAVE report](https://wave.webaim.org/) showed that I had no headings in my HTML | Added appropriate headings for a clearer HTML structure |
| The [WAVE report](https://wave.webaim.org/) showed contrast errors | Changed the text colors for better contrast |
| I realized that my game was only playable with mouse/touch input, not with keyboard, making it less accessible for certain users. |  1. In HTML, I changed all interactive elements to have the tag `button` instead of `div` or `p`. <br> 2. In the script file, I added code to enable/disable the buttons depending on the stage of the game and the visible screen to make sure hidden elements were not accessible via `TAB` key. <br> 3. In the CSS file, I adjusted styles to make sure focused elements were visible as such. |


### Remaining

| Issue | Fix attempt |
|---|---|
