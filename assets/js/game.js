//Setup and storage for questions
var questions = localStorage.getItem("questionList");
questions = JSON.parse(questions);

var starterQuestions = [{
    question: "TRUE lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    answer: true
},
{
    question: "TRUE lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    answer: true
},
{
    question: "TRUE lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    answer: true
},
{
    question: "FALSE lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    answer: false
},
{
    question: "FALSE lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    answer: false
},
{
    question: "FALSE lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    answer: false
}];
//First time loading Quiz, will use StarterQuestions array
if (!questions) {
    questions = starterQuestions;
    localStorage.setItem("questionList", JSON.stringify(questions));
};

var highScore = localStorage.getItem("highScore");
highScore = JSON.parse(highScore);
if (!highScore) {
    highScore = 0;
    localStorage.setItem("highScore", JSON.stringify(highScore));
}
document.getElementById("high-score").innerHTML = highScore;

//Button Elements
var startBtnEl = document.querySelector(".start-btn");
var trueBtn = document.querySelector(".true-btn");
var falseBtn = document.querySelector(".false-btn");

var score = 60;
var timer = function () {
    score--;
    if (score <= 0) {
        endQuiz(0);
        return;
    } else {
    document.getElementById("timer").innerText = score;
    }
}

var startQuiz = function (questions) {

    //Shuffles questions in array(Credit goes to Durstenfeld shuffle algorithm found on Stack Overflow)
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }

    setInterval(timer, 1000);

    questionMaker(questions[0], 0);

}

var questionMaker = function (question, questionNumber) {

    if (!question) {
        var finalScore = document.querySelector("#timer").innerHTML;
        endQuiz(finalScore);
        console.log("END OF QUIZ")
    } else {

        //Clears the window
        var slideEl = document.querySelector("main");
        slideEl.remove();
        questionNumber++

        //Creates elements for slide
        var body = document.querySelector("body");
        var slide = document.createElement("main");

        var questionHeader = document.createElement("h1");
        questionHeader.textContent = "Question #" + questionNumber;

        var questionContent = document.createElement("p");
        questionContent.textContent = question.question;

        var trueBtn = document.createElement("button");
        trueBtn.textContent = "True";

        var falseBtn = document.createElement("button");
        falseBtn.textContent = "False"

        //Puts elements together into the slide
        slide.appendChild(questionHeader);
        slide.appendChild(questionContent);
        slide.appendChild(trueBtn);
        slide.appendChild(falseBtn);
        body.appendChild(slide);

        var answerQuestion = function (answer) {
            if (answer === question.answer) {
                console.log("Correct!")
                questionMaker(questions[questionNumber], questionNumber)
            } else {
                console.log("Incorrect!");
                score = score - 10;
                questionMaker(questions[questionNumber], questionNumber)
            }
        };

        trueBtn.addEventListener("click", function () {
            answerQuestion(true);
        });
        falseBtn.addEventListener("click", function () {
            answerQuestion(false);
        });
    }
}

var endQuiz = function (score) {

    var slideEl = document.querySelector("main");
    slideEl.remove();

    var body = document.querySelector("body");
    var slide = document.createElement("main");

    var scoreHeader = document.createElement("h1");
    scoreHeader.textContent = "End of Quiz!";

    var scoreContent = document.createElement("p");
    scoreContent.innerHTML = "Congratulations! You have achieved a high score of " + score;

    slide.appendChild(scoreHeader);
    slide.appendChild(scoreContent);
    body.appendChild(slide);

    if (score > highScore) {
        highScore = score
        localStorage.setItem("highScore", JSON.stringify(highScore));
    }
    
    var timeLeftEl = document.querySelector("#timer")
    timeLeftEl.remove();
}
//Start Button Listener
startBtnEl.addEventListener("click", function () { startQuiz(questions) });

console.log(questions);
