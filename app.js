const start = document.querySelector(".start");
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const allAnswerChoices = document.querySelectorAll(".choice");
const answerChoiceA = document.querySelector("#A");
const answerChoiceB = document.querySelector("#B");
const answerChoiceC = document.querySelector("#C");
const answerChoiceD = document.querySelector("#D");
const counter = document.querySelector(".counter");
const timeGauge = document.querySelector(".time-gauge");
const progressContainer = document.querySelector(".progress-container");
const scoreContainer = document.querySelector(".score-container");


//Questions
let questions = [
{
    question: "How many moons does Earth have?",
    questionImg: "img/1.jpg",
    choiceA: "2",
    choiceB: "5",
    choiceC: "1",
    choiceD: "8",
    correctAnswer: "1"
},
{
    question: "In what year did Pluto become reclassified as a dwarf planet?",
    questionImg: "img/2.jpg",
    choiceA: "2006",
    choiceB: "2018",
    choiceC: "1960",
    choiceD: "2010",
    correctAnswer: "2006"
},
{
    question: "Which planet rotates on its side?",
    questionImg: "img/3.jpg",
    choiceA: "Saturn",
    choiceB: "Moon",
    choiceC: "Mercury",
    choiceD: "Uranus",
    correctAnswer: "Uranus"
},
{
    question: "Which planet spins backward relative to the others?",
    questionImg: "img/4.jpg",
    choiceA: "Earth",
    choiceB: "Venus",
    choiceC: "Sun",
    choiceD: "Neptune",
    correctAnswer: "Venus"
},
{
    question: "Which planet has the most volcanoes?",
    questionImg: "img/5.jpg",
    choiceA: "Callisto",
    choiceB: "Venus",
    choiceC: "Mercury",
    choiceD: "Ceres",
    correctAnswer: "Venus"
},
{
    question: "Which is the densest planet in our solar system?",
    questionImg: "img/6.jpg",
    choiceA: "Earth",
    choiceB: "Mercury",
    choiceC: "Saturn",
    choiceD: "Pluto",
    correctAnswer: "Earth"
},
{
    question: "Which is the brightest planet in the night’s sky?",
    questionImg: "img/7.jpg",
    choiceA: "Saturn",
    choiceB: "Moon",
    choiceC: "Venus",
    choiceD: "Mars",
    correctAnswer: "Venus"
},
{
    question: "Which is the oldest planet in our solar system?",
    questionImg: "img/8.jpg",
    choiceA: "Jupiter",
    choiceB: "Mars",
    choiceC: "Pluto",
    choiceD: "Eris",
    correctAnswer: "Jupiter"
},
{
    question: "How long is one year on Jupiter?",
    questionImg: "img/9.jpg",
    choiceA: "4 Earth years",
    choiceB: "1.5 Earth years",
    choiceC: "12 Earth years",
    choiceD: "0.5 Earth years",
    correctAnswer: "12 Earth years"
},
{
    question: "Which planet has the most moons?",
    questionImg: "img/10.jpg",
    choiceA: "Europa",
    choiceB: "Mars",
    choiceC: "Earth",
    choiceD: "Saturn",
    correctAnswer: "Saturn"
}
];

const lastQuestion = questions.length -1;
let activeQuestion = 0;
let count = 0;
const questionTime = 10; //seconds
const gaugeWidth = 800;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// Start Button Event Listener

start.addEventListener("click", startQuiz);

//Answer choices event listeners

allAnswerChoices.forEach(function(clickedAnswer) {
    clickedAnswer.addEventListener("click", function(e) {
        let userAnswer = e.target.innerText;
        checkAnswer(userAnswer);
    })
})

// Function to start the quiz

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.visibility = "visible";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

// Render the Question function

function renderQuestion() {
    let q = questions[activeQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    answerChoiceA.innerHTML = q.choiceA;
    answerChoiceB.innerHTML = q.choiceB;
    answerChoiceC.innerHTML = q.choiceC;
    answerChoiceD.innerHTML = q.choiceD;
    let bodyImg = `url("${q.questionImg}")`;
    document.body.style.backgroundImage = bodyImg;
}
// Render the Progress function

function renderProgress() {
    for(let questionIndex = 0; questionIndex <= lastQuestion; questionIndex++) {
        progressContainer.innerHTML += "<div class='progress-box' id="+ questionIndex +"></div>";
    }
}

//Render the counter function

function renderCounter() {
    if(count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    } else {
        answerIsIncorrect();
        nextQuestion();
    }
}

function checkAnswer(answer) {
    if(answer === questions[activeQuestion].correctAnswer) {
        score++;
        answerIsCorrect();
    } else {
        answerIsIncorrect();
    }
    nextQuestion();
}


function answerIsCorrect() {
    document.getElementById(activeQuestion).style.backgroundColor = "green";
}

function answerIsIncorrect() {
    document.getElementById(activeQuestion).style.backgroundColor = "red";
}

function nextQuestion() {
    count = 0;
    if(activeQuestion < lastQuestion) {
        activeQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        renderScore();
    }
}

function renderScore() {
    scoreContainer.style.visibility ="visible";

    let scorePercentage = Math.round((100 * score) / questions.length);
    scoreContainer.innerHTML = `<h2>Percentage of correct answers: ${scorePercentage}%</h2>`;
    scoreContainer.innerHTML += `<h2>Number of incorrect answers: ${10 - score}</h2>`
}