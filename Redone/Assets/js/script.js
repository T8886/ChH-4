//Assignment completed with the assistance of multiple tutors and TA 
//Questions were taken from https://www.sanfoundry.com/1000-javascript-questions-answers/
 const questions = [
    {
        question: " Arrays in JavaScript are defined by which of the following statements?",
        choices: ["a. It is an ordered list of values", "b. It is an ordered list of objects", "c. It is an ordered list of string", "d. It is an ordered list of functions"],
        answer: "a. It is an ordered list of values"
    },
    {
        question: "Which of the following scoping type does JavaScript use?",
        choices: ["a. Sequential", "b. Segmental", "c. Lexical", "d. Literal"],
        answer: "c. Lexical"
    },
   
    {
        question: "Which of the following is not a framework?",
        choices: ["a. JavaScript .NET", "b.  JavaScript", "c. Cocoa JS", "d. jQuery"],
        answer: "c. JavaScript"
    },
];

// grab references to elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var starting = document.getElementById("start");
var startBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choice_a = document.getElementById("btn0");
var choice_b = document.getElementById("btn1");
var choice_c = document.getElementById("btn2");
var choice_d = document.getElementById("btn3");
var showAanswer = document.getElementById("showAanswer");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// define other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// functions


// WHEN I click the start button, timer starts
var totalTime = 30;
function Quiz() {
    questionIndex = 0;
    totalTime = 30;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    starting.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameCompleted();
            }
        }
    },1000);

    showQuiz();
};

// questions and choices displayed
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choice_a.textContent = questions[questionIndex].choices[0];
    choice_b.textContent = questions[questionIndex].choices[1];
    choice_c.textContent = questions[questionIndex].choices[2];
    choice_d.textContent = questions[questionIndex].choices[3];
}

// validate the answer
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    showAanswer.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        // correct answer, add 1 score to final score
        correctAns++;
        // console.log(correctAns);
        showAanswer.textContent = "Correct!";
    } else {
        // wrong answer, deduct 10 second from timer
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        showAanswer.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // if no more question, run game over function
        gameCompleted();
    }
}

function a() { checkAnswer(0); }

function b() { checkAnswer(1); }

function c() { checkAnswer(2); }

function d() { checkAnswer(3); }

// all questions are answered or timer reaches 0
function gameCompleted() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    starting.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    // show final score
    finalScore.textContent = correctAns;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    starting.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

    starting.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

//Event listeners

startBtn.addEventListener("click", Quiz);
choice_a.addEventListener("click", a);
choice_b.addEventListener("click", b);
choice_c.addEventListener("click", c);
choice_d.addEventListener("click", d);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    starting.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});