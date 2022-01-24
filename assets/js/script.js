var startBtnEl = document.getElementById("start-btn");
var startPage = document.getElementById("startPage");
var header = document.getElementById("header");

function startQuiz() {
  header.style.display = "none";
  startPage.style.display = "none";
}

startBtnEl.addEventListener("click", startQuiz);
