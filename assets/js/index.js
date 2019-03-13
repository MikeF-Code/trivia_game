$(document).ready(function() {
    $("#quizCard").hide();
    $("#results").hide();
});

var questions = [{
    question: "Who invented the World Wide Web?",
    image: "./assets/images/Q1.jpg",
    choices: ["Steve Jobs", "Tim Berners-Lee", "Al Gore", "Bill Gates"],
    answer: "Tim Berners-Lee"
},
{
    question: "When was the World Wide Web first made available to the public?",
    image: "./assets/images/Q2.jpg",
    choices: ["August 1991", "January 1991", "August 1990", "January 1990"],
    answer: "August 1991"
},
{
    question: "What year was the first direct IP connection made between the US and Europe?",
    image: "./assets/images/Q3.png",
    choices: ["1986", "1987", "1988", "1989"],
    answer: "1988"
},
{
    question: "What type of computer was used as the world's first Web server?",
    image: "./assets/images/Q4.jpg",
    choices: ["IBM", "NeXT", "HP", "Custom Built"],
    answer: "NeXT"
},
{
    question: "What year was the Mosaic web browser introduced?",
    image: "./assets/images/Q5.png",
    choices: ["1990", "1991", "1992", "1993"],
    answer: "1993"
},
{
    question: "A clickable object that directs your web browser to another location on the WWW is known as a?",
    image: "./assets/images/Q1.jpg",
    choices: ["Image", "Hyperlink", "Direct Message", "Facebook"],
    answer: "Hyperlink"
},
{
    question: "What is the name of the organization that helped publish and create the WWW as we know it today?",
    image: "./assets/images/Q7.jpg",
    choices: ["NASA", "Department of Defense", "Microsoft", "CERN"],
    answer: "CERN"
},
{
    question: "What is the international community responsible for development and publication of the standards used in the WWW?",
    image: "./assets/images/Q8.jpg",
    choices: ["Internet Group", "Usenet", "W3C", "United Nations"],
    answer: "W3C"
},
{
    question: "What is the Markup language primarily used to format and render web pages?",
    image: "./assets/images/Q9.png",
    choices: ["HTML", "XML", "LaTeX", "SGML"],
    answer: "HTML"
},
{
    question: "Which student would you most want to work with in your day job?",
    image: "./assets/images/Q2.jpg",
    choices: ["Mike Feller", "Mike Feller", "Mike Feller", "Mike Feller"],
    answer: "Mike Feller"
}];

var time;
var game = {

    questions: questions,
    counter: 30,
    round: 0,
    right: 0,
    wrong: 0,

    start: function() {
        $("#quizCard").show();
        this.round = 0;
        this.right = 0;
        this.wrong = 0;
        this.counter = 30;
        this.questionLoad();
    },

    questionLoad: function() {
        $("#quizCard").html('<div class="card large animated fadeInDown"><div class="card-image"><img src="' + questions[this.round].image + '"><span class="card-title" id="timer"></span></div><div class="card-content"><h4>' + questions[this.round].question + '</h4></div><div class="card-action"></div></div>');
        time = setInterval(game.timer, 1000);
        for (var i = 0; i < questions[this.round].choices.length; i++) {
            $(".card-action").append('<a class="answer btn waves-effect waves-light" data-answer="'+ questions[this.round].choices[i] +'">' + questions[this.round].choices[i] +'</a>');
        }
    },

    timer: function() {
        game.counter--;
        $("#timer").text(game.counter);
        if (game.counter === 0) {
            game.outOfTime();
        }
    },

    outOfTime: function() {
        clearInterval(time);
        M.toast({html:"Time's Up!", classes: "wrongAnswer", displayLength: 2625, completeCallback: game.newRoundCheck});
    },

    newQuestion: function() {
        game.counter = 30;
        $("#timer").text(game.counter);
        game.round++;
        game.questionLoad();
    },

    results: function() {
        clearInterval(time);
        $("#quizCard").hide();
        $("#results").show();
        $("#results").html('<h2>Results</h2><table class="centered animated fadeInLeft"><thead><tr><th>Correct</th><th>Incorrect</th><th>Unanswered</th></tr></thead><tbody><tr><th>' + game.right + '</th><th>' + game.wrong + '</th><th>' + (questions.length - (game.right + game.wrong)) + '</th></tr></tbody></table><a class="btn-large waves-effect waves-light gameStart"><i class="material-icons left">language</i><i class="material-icons right">language</i>Try Again?</a>');
    },

    click: function(event) {
        clearInterval(time);
        $(".btn").addClass("disabled");
        if ($(event.target).attr("data-answer") === questions[this.round].answer) {
            this.correct();
        } else {
            this.incorrect();
        }
    },

    correct: function() {
        clearInterval(time);
        game.right++;
        M.toast({html:"Correct Answer!", classes: "rightAnswer", displayLength: 2625, completeCallback: game.newRoundCheck});
    },

    incorrect: function() {
        clearInterval(time);
        game.wrong++;
        M.toast({html: "Wrong Answer!", classes: "wrongAnswer", displayLength: 2625, completeCallback: game.newRoundCheck});
    },

    newRoundCheck: function() {
        if(game.round === questions.length - 1) {
            game.results();
        } else {
            game.newQuestion();
        };
    }
};

$(document).on("click", ".gameStart", function() {
    $("#landing").hide();
    $("#results").hide();
    game.start();
});

$(document).on("click", ".answer", function(event) {
    game.click(event);
});