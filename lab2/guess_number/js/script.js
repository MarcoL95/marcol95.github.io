//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", intializeGame);


// Global variables
let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLosses = 0;

intializeGame();

function intializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randon number: " + randomNumber);

    //hide the reset button
    document.querySelector("#resetBtn").style.display = "none";

    // Show the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // adding focus to text box
    playerGuess.value = ""; // clear the text box
    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // clear the feedback message
    document.querySelector("#guesses").textContent = ""; //Clear the previous guesses
    let remaining = document.querySelector("#remaining");
    remaining.textContent = "You have 7 attempts remaining."; // reset remaining attempts message
    attempts = 0; // reset attempts
}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a number between 1 and 99!";
        feedback.style.color = "red";
        return;
       }

    let remaining = document.querySelector("#remaining");
    attempts++;
    console.log("attempts: " + attempts);
    feedback.style.color = "orange";
    remaining.textContent = "You have " + (7 - attempts) + " attempts remaining.";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        totalWins++;
        gameOver();
    }
    else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) { 
            feedback.textContent = "Sorry, you lost!" + " The number was " + randomNumber + ".";
            feedback.style.color = "red";
            totalLosses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";
        } else {
            feedback.textContent = "Guess was low!";
        }
    }
}

function gameOver() {
    document.querySelector("#wins").textContent = totalWins;
    document.querySelector("#losses").textContent = totalLosses;
    guessBtn = document.querySelector("#guessBtn");
    resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hide the guess button
    resetBtn.style.display = "inline"; //show the reset button
}
