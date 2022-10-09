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

// variables
var clock = document.getElementById("clock");
var remainingTime = document.getElementById("remainingTime");
var timeIsUp = document.getElementById("timeIsUp");

var starting = document.getElementById("start");
var startBtn = document.getElementById("startBtn");

var questionCont = document.getElementById("questionCont");
var questionHead = document.getElementById("questionHead");
var choice_a = document.getElementById("btn0");
var choice_b = document.getElementById("btn1");
var choice_c = document.getElementById("btn2");
var choice_d = document.getElementById("btn3");
var showAns = document.getElementById("showAns");

var overview = document.getElementById("overview");
var InitialsBtn = document.getElementById("InitialsBtn");
var input = document.getElementById("input");
var page = document.getElementById("page");

var highSc = document.getElementById("highSc");
var totalScore = document.getElementById("totalScore");

var backBtn = document.getElementById("backBtn");
var clearHSBtn = document.getElementById("clearHSBtn");
var viewRecords = document.getElementById("viewRecords");
var scoresRecord = document.getElementById("scoresRecord");

var correctAnswers = 0;
var indexQ = 0;

// clock starts when Start button clicked
var time = 31;
function Quiz() {
    indexQ = 0;
    time = 30;
    remainingTime.textContent = time;
    input.textContent = "";

    starting.style.display = "none";
    questionCont.style.display = "block";
    clock.style.display = "block";
    timeIsUp.style.display = "none";

    var startClock = setInterval(function () {
        time--;
        remainingTime.textContent = time;
        if (time <= 0) {
            clearInterval(startClock);
            if (indexQ < questions.length - 1) {
                quizCompleted();
            }
        }
    }, 1000);

    startOver();
};

// questions and multiple answers choices displayed
function startOver() {
    questionsArray();
}

function questionsArray() {
    questionHead.textContent = questions[indexQ].question;
    choice_a.textContent = questions[indexQ].choices[0];
    choice_b.textContent = questions[indexQ].choices[1];
    choice_c.textContent = questions[indexQ].choices[2];
    choice_d.textContent = questions[indexQ].choices[3];
}

// validating the answer
function answerValidation(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    showAns.style.display = "block";

    if (questions[indexQ].answer === questions[indexQ].choices[answer]) {
        // if correct answer picked 1 score will be added to the total score
        correctAnswers++;
        showAns.textContent = "Correct!";
    } else {
        // if wrong answer chosen - subtract 8 sec.
        time -= 8;
        remainingTime.textContent = time;
        showAns.textContent = "Wrong! The correct answer is: " + questions[indexQ].answer;
    }

    indexQ++;
    // continue with the remaining questions 
    if (indexQ < questions.length) {
        questionsArray();
    } else {
        // on a last question
        quizCompleted();
    }
}

function a() { answerValidation(0); }
function b() { answerValidation(1); }
function c() { answerValidation(2); }
function d() { answerValidation(3); }

// all questions are answered or clock reaches 0
function quizCompleted() {
    overview.style.display = "block";
    questionCont.style.display = "none";
    starting.style.display = "none";
    clock.style.display = "none";
    timeIsUp.style.display = "block";
    totalScore.textContent = correctAnswers;
}

// initials and total scores stored in local storage
function storeRecords(event) {
    event.preventDefault();

    // alert pop up if initials are not enetered
    if (input.value === "") {
        alert("Please enter your initials!");
        return;
    }

    starting.style.display = "none";
    clock.style.display = "none";
    timeIsUp.style.display = "none";
    overview.style.display = "none";
    highSc.style.display = "block";

    // storing scores
    var savedRecords = localStorage.getItem("total scores");
    var recordsArray;

    if (savedRecords === null) {
        recordsArray = [];
    } else {
        recordsArray = JSON.parse(savedRecords)
    }

    var playerScore = {
        initials: input.value,
        score: totalScore.textContent
    };

    console.log(playerScore);
    recordsArray.push(playerScore);

    // to store in local storage array has to be stringify 
    var recordsArrayString = JSON.stringify(recordsArray);
    window.localStorage.setItem("total scores", recordsArrayString);

    // displaying total score
    scoreOverview();
}
var i = 0;
function scoreOverview() {

    starting.style.display = "none";
    clock.style.display = "none";
    questionCont.style.display = "none";
    timeIsUp.style.display = "none";
    overview.style.display = "none";
    highSc.style.display = "block";

    var savedRecords = localStorage.getItem("total scores");

    // checking for previously stored records in local storage 
    if (savedRecords === null) {
        return;
    }
    console.log(savedRecords);

    var records = JSON.parse(savedRecords);

    for (; i < records.length; i++) {
        var everyRecord = document.createElement("p");
        everyRecord.innerHTML = records[i].initials + ": " + records[i].score;
        scoresRecord.appendChild(everyRecord);
    }
}

//Event listeners

startBtn.addEventListener("click", Quiz);
choice_a.addEventListener("click", a);
choice_b.addEventListener("click", b);
choice_c.addEventListener("click", c);
choice_d.addEventListener("click", d);

InitialsBtn.addEventListener("click", function (event) {
    storeRecords(event);
});

viewRecords.addEventListener("click", function (event) {
    scoreOverview(event);
});

backBtn.addEventListener("click", function () {
    starting.style.display = "block";
    highSc.style.display = "none";
});

clearHSBtn.addEventListener("click", function () {
    window.localStorage.removeItem("total scores");
    scoresRecord.innerHTML = "Total Scores Cleared!";
});