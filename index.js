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
    ["Kobe Bryant","Bill Russell","Michael Jordan","Phil Jackson"],
    ["Golden State Warriors","Chicago Bulls","Boston Celtics", "Miami Heat"],
    ["Lebron James","Scott Skiles", "Steve Nash","Rajon Rondo"],
    ["Steve Kerr","James Harden","Stephen Curry","Klay Thompson"],
    ["Phoenix Suns","Toronto Raptors","New York Knicks","Minnesota Timberwolves"],
    ["Milwaukee Bucks","Boston Celtics","Seattle Supersonics","Minnesota Timberwolves"],
    ["2002","2003","2004","2005"],
    ["New York","Maryland","Miami","Ohio"]
]
const correct_answer_index = [2,1,1,0,1,0,3,3,1,3]

const boxNames = [
    "js-start-quiz",
    "js-question-form",
    "js-answer-page",
    "js-ending-quiz",
]
const answerChoices= ["#answer-0","#answer-1","#answer-2","#answer-3"]
const correctSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFlybboxnupOiwk0kOGlK4opY-FJrco8Lp3dGdTKFBUjVFVPd"
const incorrectSrc= "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Michael_Jordan_crying.jpg/220px-Michael_Jordan_crying.jpg"

function showBox(currentBox){
    //take the class of the current box that should be displayed.
    //displays that box.
    //hide the three other boxes.
    for (let i=0;i<boxNames.length;i++){
        //identify for the desired box to display
        if (currentBox===boxNames[i]){
            //if currently hidden --> unhide
            if ($(`.${boxNames[i]}`).hasClass("hide-me")){
                $(`.${boxNames[i]}`).toggleClass("hide-me")
            }
        }
        //identify other boxes 
        else {
            //if currently displaying another box. hide
            if ($(`.${boxNames[i]}`).hasClass("hide-me")===false){
                $(`.${boxNames[i]}`).toggleClass("hide-me")
            }
        }
    }
}

function handleStart(){
    console.log("handleStart handling start quiz activated")
    $(".js-start-form").click((event)=>{
        event.preventDefault()
        console.log("button pressed")
        questionCounter += 1
        updateQuestionPage(questionCounter)
        renderScores()
        showBox("js-question-form")
    })
}

function updateQuestionPage(questionNumber){
    $(".js-question-heading").text(`NBA QuizApp question: ${questionNumber}`)
    $(".js-question-legend").text(`${questions[questionNumber-1]}?`)
    $(".js-choice-0").text(`${answers[questionNumber-1][0]}`)
    $(".js-choice-1").text(`${answers[questionNumber-1][1]}`)
    $(".js-choice-2").text(`${answers[questionNumber-1][2]}`)
    $(".js-choice-3").text(`${answers[questionNumber-1][3]}`)
}

function updateAnswerPage(questionNumber,selectedAnswerIndex){
    if (selectedAnswerIndex==correct_answer_index[questionNumber-1]){
        $(".js-answer-page").html(`
        <h2>Correct!</h2>
            <div class="js-answer-page-box">
                <p>You got question ${questionNumber} correct</p>
                <p>Answer was ${answers[questionNumber-1][correct_answer_index[questionNumber-1]]}</p>
                <form action="">
                    <button class="js-next-question" type="submit">Next Question</button>
                </form>
                
            </div>
            <img src=${correctSrc} alt="Giannis Antetokounmpo clapping, goodjob!" class="result-image">
        `)
    }
    else {
        $(".js-answer-page").html(`
        <h2>Wrong!</h2>
        <div class="js-answer-page-box">
            <p>You got question ${questionNumber} incorrect</p>
            <p>Correct answer was ${answers[questionNumber-1][correct_answer_index[questionNumber-1]]}</p>
            <p>You selected ${answers[questionNumber-1][selectedAnswerIndex]}</p>
            <form action="">
                <button class="js-next-question" type="submit">Next Question</button>
            </form>
            <img src=${incorrectSrc} alt="Michael Jordan Crying, you did not get it right!" class="result-image">
        </div>
        `)
    }
    if (questionNumber ===10){
        $(".js-next-question").text("See Your Results!")
    }
}
function updateScores(questionNumber,userAnswer){
    if (correct_answer_index[questionNumber-1]==userAnswer){
        score += 1
    }
}
function updateQuestionCounter(){
    if (questionCounter < 10){
        questionCounter += 1
    }
}
function handleSubmitAnswer(){
    console.log("handleSubmitAnswer handling answer submission for all answer submissionas")
    $(".js-question-form").on("click","button",event=>{
        event.preventDefault()
        let selected_answer;
        for (let i =0; i<answerChoices.length;i++){
            if ($(answerChoices[i]).prop("checked")){
                selected_answer = $(answerChoices[i]).attr("value")
            }
        }
        //revert checked prop to first choice:
        $(answerChoices[0]).prop("checked",true)
        updateAnswerPage(questionCounter,selected_answer)
        updateScores(questionCounter,selected_answer)
        renderScores()
        showBox("js-answer-page")
    })
}
function updateEndingQuiz(){
    $(".js-final-score").text(`${score}`)
    $(".js-final-score-possible").text(`${questions.length}`)
}
function handleNextQuestion(){
    console.log("handleNextQuestion handling next question after we read answer result")
    $(".js-answer-page").on("click","button",event=>{
        event.preventDefault()
        if (questionCounter <10){
            updateQuestionCounter()
            renderScores()
            updateQuestionPage(questionCounter)
            showBox("js-question-form")
        }
        else{
            updateEndingQuiz()
            showBox("js-ending-quiz")
        }
    })
}

function handleRestartQuiz(){
    console.log("handleRestartQuiz restarting the quiz")
    //reset all data counters
    $(".js-restart-quiz-button").click(event=>{
        event.preventDefault()
        console.log("here")
        score = 0
        questionCounter = 0 
        //render data
        renderScores()
        //go back to starting page
        showBox("js-start-quiz")
    })  
}

function renderScores(){
    $(".js-question-possible").text(questions.length)
    $(".js-question").text(questionCounter)
    $(".js-score").text(score)
}
function callback(){
    //document ready function that will call my event handling functions.
    handleStart()
    handleSubmitAnswer()
    handleNextQuestion()
    handleRestartQuiz()
    renderScores()
    showBox("js-start-quiz")
}

//when document is ready start with callback
$(callback)
