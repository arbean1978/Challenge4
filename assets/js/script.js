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
const name = document.getElementById("name");
const submit_score = document.getElementById("submit_score");
const error_message = document.getElementById("error_message");

//Questions
class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
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

/