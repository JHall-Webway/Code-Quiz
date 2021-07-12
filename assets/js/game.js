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

//Button Elements
var startBtnEl = document.querySelector(".start-btn");
var trueBtn = document.querySelector(".true-btn");
var falseBtn = document.querySelector(".false-btn");


var startQuiz = function (questions) {

    //Shuffles questions in array(Credit goes to Durstenfeld shuffle algorithm found on Stack Overflow)
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }

    questionMaker(questions[0], 0);

}

var questionMaker = function (question, questionNumber) {

    //Clears the window
    var slideEl = document.querySelector("main");
    slideEl.remove();

    if (!question) {
        console.log("END OF GAME")
    } else {

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
                console.log("Incorrect!")
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

var endGame = function(score) {
    
}
//Start Button Listener
startBtnEl.addEventListener("click", function () { startQuiz(questions) });

console.log(questions);
