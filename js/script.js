/** Flow
 * Pick a random letter
 * Wait for the user to type a key on their keyboard
 * Check that letter against the random letter the computer chose
 * Let the user know if they are right or wrong
 * If they are wrong, we deduct from the number of guesses, then render that wrong guess on the screen
 * If wrong and they don't have any guesses left, show losing message and reset the game
 * If right, we show a winning message and update the wins column and reset the game
*/

// Game Variables
let wins = 0;
let losses = 0;
let guessesLeft = 10;
let userGuesses = []; // Keep track of all of the letters that the user has chosen
let randomLetter;
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('') // generate an array from the string of letters

// Utility Functions
const computerChoice = () => {
    //recreate letters[idx]
    randomLetter = letters[Math.floor(Math.random() * letters.length)];
}

//drying up our code
const displayMessage = message => alert(message);

// initialize game function
const initializeGame = () => {
    /* Flow
    * 2 scenarios 
    * A - on the first load
    * B - after a win/loss game condition is met (aka after a game has finished)
    *   - Show the wins, losses - increment of +1 to a loss/win based on game end
    *   - Show the guesses left for a new game (same as the initial load) 
    *   - Clean out the old guesses and show the user guesses array with no letters
    */ 
    
    // Scenario A

    // Check if the user has already played the game and is resetting
    if (userGuesses.length > 0 && guessesLeft !== 10) {
        userGuesses = []; // when we reset/re-initialize the game, update hte previous game's guesses back to nothing
        guessesLeft = 10;
    }

    winsElement();
    lossesElement();
    guessesLeftElement();
    userGuessesElement();
    computerChoice();

};

// UI Functions --> use functions to store code that will manipulate the DOM for you.
    //set the value of the span with ID win in our front end to the value of the UI variable at the time we call the function
const winsElement = () => (document.getElementById('wins').innerHTML = wins);
const lossesElement = () => (document.getElementById('losses').innerHTML = losses);
const guessesLeftElement = () => (document.getElementById('guesses-left').innerHTML = guessesLeft);
const userGuessesElement = () => (document.getElementById('user-guesses').innerHTML = userGuesses);

// Event Listeners

document.addEventListener('keypress', function(event) {
    // save the value of the key that was pressed into a variable

    /* only lower case

   
    */
    const userChoice = event.key.toLowerCase();

    // excludes numeric
    // excludes special characters
    if (!letters.includes(userChoice)) {
        // Show an error message
        displayMessage('No special characters or numbers, please pick a letter from the alphabet');

    // exclude duplicate choices
    } else if (userGuesses.includes(userChoice)) {
        displayMessage('Sorry, but you cannot choose the same letter twice');
    } else {
        // decrement the number of guesses and show the letter guessed
        guessesLeft -= 1;
        userGuesses.push(userChoice);

        // Show the letters guessed
        userGuessesElement();
        guessesLeftElement();
    }
 

    console.log('guesses left', guessesLeft);
    console.log(userChoice)
    // check the userChoice against the letter chosen by the PC
    if(randomLetter === userChoice) {
        // if right --> win, then increment wins and show winning percentage
        displayMessage("Way to go!!! You're a freaking mind reader!!!")
        wins += 1;
        initializeGame();
    } else if (guessesLeft === 0){
        // check that number of guesses is not 0 and show the letter guessed
        // if no guesses left, then --> losses + 1 to a loss based game end
        // a.) ['a', 'b', 'c', ... 10th letters] --> at the time of tthe loss condition, this needs to be reset
        displayMessage("Nice try pal. Better luck next time!")
        losses += 1;
        initializeGame();
    }

})
    // Listen for the user to type a key in the keyboard
    // If win, then increment wins and show winning message
    // If Wrong, then add decrement number of guesses, check that number of guesses not 0 and show the letters guessed


// Initialize the application
initializeGame();