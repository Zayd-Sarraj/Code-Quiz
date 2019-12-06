var quizQs = document.querySelector("#quizTitle")
var quizAs = document.querySelector("#quizContent")
var timeCount = document.querySelector("#timer")
var gameStartButton = document.querySelector("#startButton");
var timeLeft = ""
var i = ""
var timerInterval = ""
// Timer function
function countDown() {
    if (timeLeft === 0) {
        nextQuestion()
    }
    else {
    timeLeft--;
    timeCount.textContent = "Time: " + timeLeft;}
}
// function to start the game and time 
function startGame() {
    i = 0;
    timeLeft = 150;
    timerInterval = setInterval(countDown, 1000);
    nextQuestion();
}
// function to advance the game to the next question 
function nextQuestion() {
    console.log(i)
    // first check if quiz is over or if time is out 
    if (i > 9 || timeLeft < 1) {
        clearInterval(timerInterval)
        quizQs.textContent = "New Highscore: " + timeLeft;
        var scoreInput = document.createElement("input")
        scoreInput.setAttribute("class", "mx-auto px-auto")
        scoreInput.setAttribute("value", "Enter your name")
        quizAs.innerHTML = " "
        quizAs.appendChild(scoreInput)
    }

    else {
        // Change the title div text content to the first question
        quizQs.textContent = questions[i].title;
        // Empty the description div
        quizAs.innerHTML = " ";
        // Create an ordered list and append it to the same div 
        var newOl = document.createElement("ol")
        quizAs.appendChild(newOl)
        // Loop through answers and create a list item and button
        for (var q = 0; q < questions[i].choices.length; q++) {
            var newButton = document.createElement("button");
            var newLi = document.createElement("li");
            newLi.setAttribute("class", "my-2")
            newButton.setAttribute("class", "btn btn-primary mx-auto");
            // set the text of the button to be the same as the answer in the array
            newButton.textContent = questions[i].choices[q];
            // append the list item and button to the ordered list 
            newLi.appendChild(newButton)
            newOl.appendChild(newLi)
            // hide the button to 'start game'
            gameStartButton.setAttribute("class", "collapse")
        }
    }
}
// Clicking the start! button starts the game 
gameStartButton.addEventListener("click", function (event) { startGame() })
// If user clicks a button 
quizAs.getElementsByClassName("btn-primary", addEventListener("click", function (event) {
    //  If the button text matches the answer, they move on to the next question
    if (event.target.textContent == questions[i].answer) {
        i++;
        nextQuestion();
    }
    // If the button is any other answer, timer loses 10 seconds
    else {
        timeLeft = timeLeft - 10;
    }

}
))

// If there are no more questions or time runs out the quiz ends and asks the user to input their name for highscores

// function to show highscores page 
function viewHighScores () {
    quizQs.textContent = "High Scores"
    quizAs.innerHTML = " "

    
}


// }
// After input of name or if 'view highscores' is clicked, highscores are displayed 

// buttons to clear highscores or start game over

// store highscores to local storage 
