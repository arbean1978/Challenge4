//Section list
const quiz_sections = document.querySelectorAll(".quiz_section");

//Start
const start_game = document.getElementById("start_quiz");
const start_btn = document.getElementById("start_button");

//Quiz questions
const quiz_questions = document.getElementById("quiz_questions");
const time_left = document.getElementById("time_remaining");
const question = document.getElementById("question");
const option = document.getElementById("option");
const choice_status = document.querySelectorAll(".choice_status");
const corAnswer = document.getElementById("corAnswer");
const wroAnswer = document.getElementById("wroAnswer");

//End
const end_section = document.getElementById("end");
const end_title= document.getElementById("end_title");
const score = document.getElementById("score");
const name = document.getElementById("fullName");
const submit_score = document.getElementById("submit_score");
const error_message = document.getElementById("error_message");

//Questions
class Question {
  constructor(question, option, indexOfCorrectChoice) {
    this.question = question;
    this.choices = this.choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}
const question_1 = new Question("Short, intense muscle contractions use______ for fuel? ", 
  ["DNA", "ATP", "CLA", "50 proof"], 2);
const question_2 = new Question("The process of a muscle cell splitting to create a new cell is called ______.", 
  ["Hyperplasia", "Hypertrophy", "Hyperactivity", "Hyperawareness"], 1);
const question_3 = new Question("When a muscle can no longer contract is has met a state of ______.", 
  ["Bliss", "Enlightenment", "Failure", "Liquid"], 3);
const question_4 = new Question("Muscle hypertrophy is best stimulated by______.", 
  ["Running", "Weight training", "Skiing", "Tennis"], 2);
const question_5 = new Question("Muscle hypertrophy is the process of______.", 
  ["Accupuncture", "stretching a muscle", "building new muscle", "massaging a muscle"], 3);
const question_list = [question_1, question_2, question_3, question_4, question_5];

let currentQuestion = 0;

let totalTime = 90;
let totalTimeInterval;
let choiceStatusTimeout; 

/******** EVENT LISTENERS ********/ 
start_btn.addEventListener('click', startGame);
option.addEventListener('click', processChoice);
submit_score.addEventListener('submit', processInput);

/******** START GAME ********/ 
function startGame() {
  showElement(quiz_sections,quiz_questions);
  
  displayTime();  
  displayQuestion();

  startTimer();
}

/******** SHOWING/HIDING ELEMENTS ********/ 
function showElement(siblingList, showElement) {
  for (element of siblingList) {
    hideElement(element);
  }
  showElement.classList.remove("hidden");
} 

function hideElement(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

/******** TIME ********/ 
function displayTime() {
    time_left.textContent = totalTime;
}

function startTimer() {
  totalTimeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
}

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}

/******** QUESTIONS ********/ 
function displayQuestion() {
  question.textContent = question_list[currentQuestion].question;

  displayChoiceList();
}

function displayChoiceList() {
  option.innerHTML = "";

  question_list[currentQuestion].choices.forEach(function(answer, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + answer;
    li.appendChild(button);
    option.appendChild(li);
  });
}

//when user answers a question
function processChoice(event) {
  const userChoice = parseInt(event.target.parentElement.dataset.index);

  resetChoiceStatusEffects();
  checkChoice(userChoice);
  getNextQuestion();
}

//Displaying choice statuses
function resetChoiceStatusEffects() {
  clearTimeout(choiceStatusTimeout);
  styleTimeRemainingDefault();
}

function styleTimeRemainingDefault() {
  time_left.style.color = "black";
}

function styleTimeRemainingWrong() {
  time_left.style.color = "red";
}

function checkChoice(userChoice) {
  if (isChoiceCorrect(userChoice)) {
    displayCorrectChoiceEffects();
  } else {
    displayWrongChoiceEffects();
  }
}

function isChoiceCorrect(choice) {
  return choice === question_list[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffects() {
  deductTimeBy(10);

  styleTimeRemainingWrong();
  showElement(choice_status, wroAnswer);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(wroAnswer);
    styleTimeRemainingDefault();
  }, 1000);
}

function deductTimeBy(seconds) {
  totalTime -= seconds;
  checkTime();
  displayTime();
}

function displayCorrectChoiceEffects() {
  showElement(choice_status, corAnswer);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(corAnswer);
  }, 1000);
}

//Get next question
function getNextQuestion() {
  currentQuestion++;
  if (currentQuestion >= question_list.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

/******** ENDING THE GAME ********/ 
function endGame() {
  clearInterval(totalTimeInterval);
  
  showElement(quiz_sections, end_section);
  displayScore();
  setEndHeading();
}

function displayScore() {
  score.textContent = totalTime;
}

function setEndHeading() {
  if (totalTime === 0) {
    end_title.textContent = "Sorry! Maybe take up another hobby...";
  } else {
    end_title.textContent = "Awesome! Time to get Hyooog";
  }
}

/******** SUBMITTING Name ********/ 
function processInput(event) {
  event.preventDefault();

  const name = name.value.toUpperCase();

  if (isInputValid(name)) {
    const score = totalTime;
    const highscoreEntry = getNewHighscoreEntry(name, score);
    saveHighscoreEntry(highscoreEntry);
    window.location.href= "./highscores.html";
  }
}

function getNewHighscoreEntry(name, score) {
  const entry = {
    name: name,
    score: score,
  }
  return entry;
}

function isInputValid(name) {
  let errorMessage = "";
  if (name === "") {
    errorMessage = "You can't submit without your name";
    displayFormError(errorMessage);
    return false;
  } else if (initials.match)  {
    errorMessage = "Initials may only include letters."
    displayFormError(errorMessage);
    return false;
  } else {
    return true;
  }
}

function displayFormError(errorMessage) {
  error_message.textContent = errorMessage;
  if (name.classList.contains("error")) {
    INITIALS_INPUT.classList.add("error");
  }
}

function saveHighscoreEntry(highscoreEntry) {
  const currentScores = getScoreList();
  placeEntryInHighscoreList(highscoreEntry, currentScores);
  localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
  const currentScores = localStorage.getItem('scoreList');
  if (currentScores) {
    return JSON.parse(currentScores);
  } else {
    return [];
  }
}

function placeEntryInHighscoreList(newEntry, scoreList) {
  const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
  scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
  if (scoreList.length > 0) {
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i].score <= newEntry.score) {
        return i;
      }
    } 
  }
  return scoreList.length;
}
