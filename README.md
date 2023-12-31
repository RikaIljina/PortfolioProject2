# What d'you know - A Quiz for Two

This project is a website with one page that allows the users to play a trivia quiz game in local multiplayer on one device, thereby testing their general knowledge and learning new facts about the world. 


The website is fully responsive across multiple devices.
![Website view on different devices](assets/images/readme_mockup_responsive.png)


## Table of Contents
- [UX](#ux "UX")
    - [Target audience](#target-audience "Target audience")
        - [First-time visitors](#first-time-visitors "First-time visitors")
        - [Returning visitors](#returning-visitors "Returning visitors")
    - [Site goal](#site-goal "Site goal")
- [Design](#design "Design")
    - [Color scheme](#color-scheme "Color scheme")
    - [Typography](#typography "Typography")
    - [Images](#images "Images")
- [Features](#features "Features")
    - [Game loop](#game-loop "Game loop")
    - [Codebase](#codebase "Codebase")
        - [File structure](#file-structure "File structure")
        - [Flowchart](#flowchart "Flowchart")
        - [Mechanics](#mechanics "Mechanics")

    - [Future features](#future-features "Future features")
    - [Known bugs](#known-bugs "Known bugs")
- [Technologies](#technologies "Technologies")
    - [Main Languages](#main-languages "Main Languages")
    - [Frameworks, Libraries, Applications](#frameworks-libraries-applications "Frameworks, Libraries, Applications")
- [Testing](#testing "Testing")
- [Deployment](#deployment "Deployment")
- [Acknowledgments](#acknowledgments "Acknowledgments") 


## UX

### Target audience

The target audience for the game are English-speaking teenagers and adults who enjoy trivia games and want to play against a local human opponent.

#### First-time visitors

First-time visitors are greeted by a welcome screen which contains a short game description - a "How-to-play" - as well as two clearly marked input fields for the player names.

#### Returning visitors

Returning visitors can immediately enter their names on page load without having to re-read the game description.

### Site goal

The site goal is to engage two people in a fun quiz game for an unspecified amount of time and encourage them to come back for even more questions to ruminate on and more new facts to learn.

## Design

When choosing a design for my game, I prioritized clearness and readability to make sure all important information was visible and easily readable to the players at all times and on different screen sizes. At the same time, I chose to implement different colors to give the game a fun and colorful feeling.

The header with the game title and the footer with copyright info are designed to be unobtrusive as to not draw attention away from the main game area.

The layout of the game area is slightly different on mobiles and on larger screens:
 - On mobiles, the area containing the active player name, their score and the note "It's your turn" is displayed at the top. The area of the inactive player is hidden. Below the player area is the card area with two or three columns, depending on the phone size. The dialog with the quiz question that appears after clicking on a card fills the entire phone screen.
 - On larger screens, the card area takes up most space in the middle of the screen and the two player areas are to the left and right of the card area. The dialog with the quiz question only fills a small percentage of the screen. A light, translucent modal fills the space behind it, preventing the user from interacting with the background.

All game elements that are clickable (category cards, answers) have a box shadow that slightly lifts them up from the background. Once they become unclickable, the shadow disappears to convey to the players that they are no longer interactive.

### Color scheme

Since this is a two-player game, each player has their own color that is used in that player's area. Whenever a player answers the question of a specific category card correctly, that card also receives that player's color. Cards whose answers have been answered incorrectly, receive a neutral gray color. That way, the players have an additional clue as to who is leading, beside the score in the player areas.

On the quiz cards, correct answers are highlighted green and wrong answers are highlighted red, which corresponds to the conventional use of color coding for "wrong" and "right". However, since these colors might present a barrier to people with color vision deficiency, the wrong answer is also marked by a line-through.

![Game palette](assets/images/readme_palette.png)

I chose three main colors for the game area: 
- Violet - header, footer, 9 category cards, quiz card, loading screen, end game screen
- Dark moss green - player 1 background
- Delft blue - player 2 background

Each of those colors has a much lighter equivalent that I use for the text:
- Thistle - for text on Violet
- Nyanza - for text on Dark moss green
- French gray - for text on Delft blue

These color combinations have been checked with the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker) to make sure the contrast ratio is sufficient.

The remaining colors are:
- Battleship gray and Davy's gray - for neutral, inactive category cards that cannot be clicked on anymore
- Dark spring green - to highlight correct answers
- Burnt umber - to highlight wrong answers

### Typography

I chose to have a single font for all game elements to make it less confusing. The font used is [Acme](https://fonts.google.com/specimen/Acme), downloaded from [Google Fonts](https://fonts.google.com/).

### Images

I did not use any images in the game due to time restrictions, though I do believe that a few well-placed graphics would improve the overall look-and-feel of the game. This is a consideration for a future update.

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

