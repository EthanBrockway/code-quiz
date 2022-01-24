var startBtnEl = document.getElementById("start-btn");
var startPageEl = document.getElementById("startPage");
var headerEl = document.getElementById("mainHeader");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var highScoreContainer = document.getElementById("highscoreContainer");
var highScoreDiv = document.getElementById("high-scorePage");
var highScoreInputName = document.getElementById("initials");
var highScoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highScoreDisplayScore = document.getElementById("highscore-score");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameOverDiv = document.getElementById("gameover");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [
  {
    question: "What is the correct way to write hello as a string?",
    optionA: "'hello'",
    optionB: "(hello)",
    optionC: '"hello"',
    optionD: "string.hello",
    correctAnswer: "c",
  },
  {
    question: "What does HTML stand for?",
    optionA: "Hypertext Main link",
    optionB: "Hypertext Main Language",
    optionC: "Highlight The Main Link",
    optionD: "Hypertext Markup Language",
    correctAnswer: "d",
  },
  {
    question: "What is the correct way log something in the console?",
    optionA: "log.console{}",
    optionB: "console()",
    optionC: "console.log{}",
    optionD: "console.log()",
    correctAnswer: "d",
  },
  {
    question: "What is the correct way to create an 'or' statement?",
    optionA: "or",
    optionB: "||",
    optionC: "--",
    optionD: ",",
    correctAnswer: "b",
  },
  {
    question:
      "How to do you call the function: var makeSoup = function() {console.log('soup has been made')}?",
    optionA: "makeSoup();",
    optionB: "makeSoup()",
    optionC: "MakeSoup();",
    optionD: "MakeSoup()",
    correctAnswer: "a",
  },
];
var finalQuestionIndex = quizQuestions.length;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;
var questionIndex = 0;

var makeQuizQuestions = function () {
  gameOverDiv.style.display = "none";
  if (questionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[questionIndex];
  questionEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.optionA;
  buttonB.innerHTML = currentQuestion.optionB;
  buttonC.innerHTML = currentQuestion.optionC;
  buttonD.innerHTML = currentQuestion.optionD;
};

function startQuiz() {
  gameOverDiv.style.display = "none";
  headerEl.style.display = "none";
  startPageEl.style.display = "none";
  makeQuizQuestions();

  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizEl.style.display = "block";
}
function showScore() {
  quizEl.style.display = "none";
  gameOverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highScoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}
submitScoreBtn.addEventListener("click", function highScore() {
  if (highScoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighScores =
      JSON.parse(localStorage.getItem("savedHighScores")) || [];
    var currentUser = highScoreInputName.value.trim();
    var currentHighScore = {
      name: currentUser,
      score: score,
    };
    gameOverDiv.style.display = "none";
    highScoreContainer.style.display = "flex";
    highScoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighScores.push(currentHighScore);
    localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
    generateHighScores();
  }
});
function generateHighScores() {
  highScoreDisplayName.innerHTML = "";
  highScoreDisplayScore.innerHTML = "";
  var highScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
  for (i = 0; i < highScores.length; i++) {
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = highScores[i].name;
    newScore.textContent = highScores[i].score;
    highScoreDisplayName.appendChild(newName);
    highScoreDisplayScore.appendChild(newScore);
  }
}
function showHighScore() {
  startPageEl.style.display = "none";
  gameOverDiv.style.display = "none";
  highScoreContainer.style.display = "flex";
  highScoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighScores();
}
function clearScore() {
  window.localStorage.clear();
  highScoreDisplayName.textContent = "";
  highScoreDisplayScore.textContent = "";
}
function replayQuiz() {
  highScoreContainer.style.display = "none";
  headerEl.style.display = "block";
  gameOverDiv.style.display = "none";
  startPageEl.style.display = "block";
  timeLeft = 60;
  score = 0;
  questionIndex = 0;
}
function checkAnswer(answer) {
  correct = quizQuestions[questionIndex].correctAnswer;

  if (answer === correct && questionIndex !== finalQuestionIndex) {
    score++;
    alert("Correct!");
    questionIndex++;
    makeQuizQuestions();
  } else if (answer !== correct && questionIndex !== finalQuestionIndex) {
    alert("Incorrect!");
    questionIndex++;
    makeQuizQuestions();
    timeLeft--;
  } else {
    showScore();
  }
}

startBtnEl.addEventListener("click", startQuiz);
