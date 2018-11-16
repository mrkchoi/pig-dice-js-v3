/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Roll dice
// Hold
// New Game
let activePlayer, currentScore, playerScores, gameStatus;

init();
function init() {
    currentScore = 0;
    activePlayer = 0;
    playerScores = [0, 0],
    gameStatus = true;

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'PlAYER 1';
    document.querySelector('#name-1').textContent = 'PlAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';
}

// Event listeners
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', init);

function roll() {
    if(gameStatus === true) {
        document.querySelector('.dice').style.display = 'block';
        // Get a random number
        let diceRoll = Math.ceil(Math.random() * 6);
        let turnScore = document.querySelector(`#current-${activePlayer}`);
        // Update the DOM with corresponding Dice img
        document.querySelector('.dice').setAttribute('src',`assets/img/dice-${diceRoll}.png`);
        // If value is not 1, add current value to current score
        if(diceRoll !== 1) {
            // Add roll score to current score
            currentScore += diceRoll;
            turnScore.textContent = currentScore;
        } else {
            // If value is 1, set current score to 0 & change player
            currentScore = 0;
            turnScore.textContent = currentScore;
            // Change Player
            changePlayer();
        }
    }
}

function changePlayer() {
    // Remove active player DOM elements
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    // Update activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Change DOM elements [background, active player] to new active player
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
}

function hold() {
    if(gameStatus === true) {
        // Set current score to total score of active player
        playerScores[activePlayer] += currentScore;
        document.querySelector(`#score-${activePlayer}`).textContent = playerScores[activePlayer];
        // Reset current score to 0
        currentScore = 0;
        document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        // If total score is greater than or equal to 100, change DOM to reflect winner, stop roll/hold btn functionality
        if(playerScores[activePlayer] >= 100) {
            // Change game status to false
            gameStatus = false;
            // Change current player background, name to winner
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
        } else {
            // change player
            document.querySelector('.dice').style.display = 'none';
            changePlayer();
        }
    }
}










/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
