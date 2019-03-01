/*
The site is comprised of 4 main boxes, at any time 3 boxes would be hidden with 1 box displayed.
Event flow will direct users from box 1 -> box 2 -> box 3 -> box 2 -> box 3 ...
    1. Start box
    2. Question box
    3. Answer box
    4. Final box

Events I will have
    1. Start Quiz 
    2. Submit answer
    3. Next Question 
    4. End quiz 

Landing on the page User will be directed to start box:
document is ready we will be calling the callback function to allow for:
    1. starting main page (landing page)
    2. Begin listenning to events
    3. Every time we move from page to page we run 5 functions:
        1. Update scores 
        2. Score logic
        3. Update necessary box
        4. render score and stats
        5. show-box - dictates which screen should be shown 

*/
'use strict';
//Global Variables Declaration
let score = 0
let questionCounter = 0
const questions = [
    "What team holds the record for most consecutive NBA championships",
    "What player scored the most points in one NBA game",
    "Who won the most career NBA championships as player",
    "What team has the best record in one season",
    "What player has the most assists in one game",
    "What player has the highest career 3-pt FG percentage",
    "What current team has the worst franchise W-L percentage",
    "What team drafted Ray Allen",
    "What year was Lebron James drafted in",
    "In which state did Lebron James play highschool basketball"
]
const answers = [
    ["Chicago Bulls","Los Angeles Lakers","Boston Celtics","Golden State Warriors"],
    ["Kobe Bryant","Wilt Chamberlain","James Harden","Michael Jordan"],
    ["Kobe Bryant","Bill Russell","","Michael Jordan","Phil Jackson"],
    ["Golden State Warriors","Chicago Bulls","Boston Celtics", "Miami Heat"],
    ["Lebron James","Scott Skiles", "Steve Nash","Rajon Rondo"],
    ["Steve Kerr","James Harden","Stephen Curry","Klay Thompson"],
    ["Phoenix Suns","Toronto Raptors","New York Knicks","Minnesota Timberwolves"],
    ["Milwaukee Bucks","Boston Celtics","Seattle Supersonics","Minnesota Timberwolves"],
    ["2002","2003","2004","2005"],
    ["New York","Maryland","Miami","Ohio"]
]
const correct_answer_index = [
    [2,1,1,0,1,0,3,3,1,3]
]

function showBox(currentBox){
    //take the class of the current box that should be displayed.
    //displays that box.
    //hide the three other boxes.
}
function handleStart(){
    console.log("handleStart handling start quiz activated")
    renderScores()
    showBox("start-quiz")
}
function handleSubmitAnswer(){
    console.log("handleSubmitAnswer handling answer submission for all answer submissionas")
}
function handleNextQuestion(){
    console.log("handleNextQuestion handling next question after we read answer result")
}
function handleRestartQuiz(){
    console.log("handleRestartQuiz restarting the quiz")
}
function renderScores(){
    console.log("A function to render the scores")
}
function callback(){
    //document ready function that will call my event handling functions.
    handleStart()
    handleSubmitAnswer()
    handleNextQuestion()
    handleRestartQuiz()
}

//when document is ready start with callback
$(callback)
