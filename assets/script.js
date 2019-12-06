var quizQs = document.querySelector("#quizTitle")
var quizAs = document.querySelector("#quizContent")
var timeCount = document.querySelector("#timer")
var gameStartButton = document.querySelector("#startButton");
var startBtnDiv = document.querySelector("#underQuiz")
var highscoreBtn = document.querySelector("#highscoreButton")
var timeLeft = ""
var i = ""
var timerInterval = ""
var highScores = []
var highScoreNames = []
// Timer function
function countDown() {
    // if time runs out go to the "next question"
    if (timeLeft <= 0) {
        nextQuestion()
    }
    // otherwise subtract 1 second and display the new time
    else {
        timeLeft--;
        timeCount.textContent = "Time: " + timeLeft;
    }
}

// function to start the game and timer 
function startGame() {
    i = 0;
    timeLeft = 150;
    timerInterval = setInterval(countDown, 1000);
    nextQuestion();
}
// Clicking the start! button starts the game 
gameStartButton.addEventListener("click", function () { startGame() })
// Clicking the View Highscores button will immediately show the High Scores
highscoreBtn.addEventListener("click", function () {
    i = 10;
    nextQuestion()
    viewHighScores()
})
// function to advance the game to the next question 
function nextQuestion() {
    console.log(i)
    console.log(highScores)
    console.log(highScoreNames)
    console.log(localStorage)
    // first check if quiz is over or if time is out 
    if (i > 9 || timeLeft <= 0) {
        // if it is, stop the timer
        clearInterval(timerInterval)
        // Create a highscore header with the score displayed, clear the answers div
        quizQs.textContent = "New Highscore: " + timeLeft;
        quizAs.innerHTML = " "
        // create an input field for the user's name
        var scoreInput = document.createElement("input")
        scoreInput.setAttribute("class", "mr-2 ml-auto")
        scoreInput.setAttribute("value", "Enter your name")
        // Create a button to submit that score
        var scoreSubmit = document.createElement("button")
        scoreSubmit.setAttribute("class", "btn btn-outline-success submit mr-auto")
        scoreSubmit.textContent = "Submit"
        // When the button is clicked
        scoreSubmit.addEventListener("click", function () {
            // Add the name and time to the arrays, and set them to local storage, then show the highscores screen
            highScores.push(timeLeft)
            highScoreNames.push(scoreInput.value)
            localStorage.setItem("Score", JSON.stringify(highScores))
            localStorage.setItem("Name", JSON.stringify(highScoreNames))
            viewHighScores()
        })
        // append the new submit button and input field to the div
        quizAs.appendChild(scoreInput)
        quizAs.appendChild(scoreSubmit)
    }
// Else if the quiz is still in play
    else {
        // Change the title div text content to the next question
        quizQs.textContent = questions[i].title;
        // Empty the description div
        quizAs.innerHTML = " ";
        // Create an ordered list and append it to the same div 
        var newOl = document.createElement("ol")
        newOl.setAttribute("class", "mx-auto mt-2")
        quizAs.appendChild(newOl)
        // Loop through answers and create a list item and button
        for (var q = 0; q < questions[i].choices.length; q++) {
            var newButton = document.createElement("button");
            var newLi = document.createElement("li");
            newLi.setAttribute("class", "my-2")
            newButton.setAttribute("class", "btn btn-secondary mx-auto");
            // set the text of the button to be the same as the answer in the array
            newButton.textContent = questions[i].choices[q];
            // append the list item and button to the ordered list 
            newLi.appendChild(newButton)
            newOl.appendChild(newLi)
            // add event listener with a conditional function to check if the answer is correct
            newButton.addEventListener("click", whichAnswer)
            // hide the button to 'start game' and 'clear Highscores'
            underQuiz.setAttribute("class", "collapse")
        }
    }
}
// Conditional function to check if the answer is correct, or otherwise subtract time
function whichAnswer() {
    //  If the button text matches the answer, they move on to the next question
    if (event.target.textContent == questions[i].answer) {
        i++;
        nextQuestion();
    }
    // If the time is over, end the game with the nextQuestion function
    else if (timeLeft <= 0) { nextQuestion() }
    // If the button is any other answer, timer loses 10 seconds    
    else {
        timeLeft -= 15;
        timeCount.textContent = "Time: " + timeLeft;
    }
}
// function to show highscores screen 
function viewHighScores() {
    // Change title to High Scores and empty the answers div
    quizQs.textContent = "High Scores"
    quizAs.innerHTML = " "
    // Create a new unordered list below the title
    var uul = document.createElement("ul");
    uul.setAttribute("class", "list-group list-group-flush mx-auto")
    quizAs.appendChild(uul)
    // Retrieve high scores from localstorage and add them to their arrays
    highScores = JSON.parse(localStorage.getItem("Score"))
    highScoreNames = JSON.parse(localStorage.getItem("Name"))
    // if the arrays are now null because the high scores were reset, make them empty arrays again
    if (highScores == null || highScoreNames == null) {
        highScores = []
        highScoreNames = []
    }
    else {
        //  Loop through the arrays
        for (var i = 0; i < highScores.length; i++) {
            var playerName = highScoreNames[i];
            var highScore = highScores[i];
            // Create a list item for each name and score
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item mx-auto")
            //  Set the text of each item to the name and score and add it to the div
            li.textContent = playerName + ": " + highScore;
            uul.appendChild(li);
        }
    }
    // Show the game start button, but make it a 'try again!' button
    underQuiz.removeAttribute("class", "collapse")
    underQuiz.setAttribute("class", "row mt-2")
    gameStartButton.textContent = "Try Again!"
    gameStartButton.setAttribute("class", "btn btn-success ml-auto mr-2 mt-2")
    // If a clear button does not already exist
    if (startBtnDiv.contains(document.getElementById("clearBtn")) == false) {
        // Create a new button to Clear Highscores
        var newButton = document.createElement("button")
        newButton.setAttribute("class", "btn btn-outline-danger mr-auto mt-2")
        newButton.setAttribute("id", "clearBtn")
        newButton.textContent = "Clear Highscores"
        // Place the button next to the "try again" button
        startBtnDiv.appendChild(newButton)
        // If the button is clicked, clear storage, and reset to the high scores screen
        newButton.addEventListener("click", function () {
            window.localStorage.clear()
            nextQuestion()
            viewHighScores()
        })
    }
}