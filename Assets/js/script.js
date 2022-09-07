// Timer
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("timer");
var secondsLeft = 60;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}
function showReport() {
    timeEl.textContent = " ";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("");
    mainEl.appendChild(imgEl);
  }  
  setTime();

// MAIN BTN
  var btn = document.getElementById("mainBtn");
  btn.innerText = "Start";

  var title = document.getElementById("title")
title.innerText = "Would you like to take a quiz?";

document.getElementById("answers").style.display="none"

btn.onclick = function () {
document.getElementById("answers").style.display="block"
document.getElementById("mainBtn").innerText="Next"
document.getElementById("title").innerText="Qestion1"
document.getElementById("question").innerText="Which of the following keywords is used to define a variable in Javascript?"

document.getElementById("answer1").innerText="var"
document.getElementById("answer2").innerText="br"
document.getElementById("answer3").innerText="lit"
document.getElementById("answer4").innerText="none of the above"

var answers = document.getElementById("answers")
answers.onclick = function (event) {
var click = event.target
if (click.matches("#answer1"))
console.log("correct");

 };
}

