/*Define variables*/
    //Assignment Code to each section
    var intro = document.querySelector("#introduction");
    var startBtn = document.querySelector("#start_button");
    var index =document.querySelector("#index_page");
    var questionPage = document.querySelector("#question_page");
    var askQuestion = document.querySelector("#ask_question");
    
    var choiceButtons = document.querySelectorAll(".choice");
    var optionBtn1 = document.querySelector("#option_btn1");
    var optionBtn2 = document.querySelector("#option_btn2");
    var optionBtn3 = document.querySelector("#option_btn3");
    var optionBtn4 = document.querySelector("#option_btn4");
    
    var checkChoice = document.querySelector("#check_choice");
    var highScore = document.querySelector("#submit_page");
    var finalScore = document.querySelector("#final_score");
    var userInitial =document.querySelector("#initial");
    
    var submitBtn =document.querySelector("#submit_btn");
    var highScorePage =document.querySelector("#highscore_page");
    var scoreRecord =document.querySelector("#score_record");
    var scoreCheck =document.querySelector("#score_check");
    var finish =document.querySelector("#finish");
    var backBtn =document.querySelector("#back_btn");
    var clearBtn=document.querySelector("#clear_btn");
    
        //Define questions
    var questionSource = [
        {
            question: "Questions 1 : Which of the following is true about variable naming conventions in JavaScript?",
            choices: ["a. JavaScript variable names must begin with a letter or the underscore character.", "b. JavaScript variable names are case sensitive.", "c. Both of the above.", "d. None of the above."],
            answer: "c"
        },
        {
            question: "Questions 2 : Which of the following is a valid type of function javascript supports?",
            choices: ["a. named function", "b. anonymous", "c. Both of the above.", "d. None of the above."],
            answer: "c"
        },
        {
            question: "Questions 3 : Which of the following type of variable is visible only within a function where it is defined?",
            choices: ["a. global variable", "b. local variable", "c. Both of the above.", "d. None of the above."],
            answer: "b"
        },
        {
            question: "Questions 4 :  Which built-in method returns the calling string value converted to upper case?",
            choices: ["a. toUpperCase", "b. toUpper", "c. changeCase(case)", "d. None of the above."],
            answer: "a"
        },
        {
            question: "Questions 5 : Which of the following function of Number object returns the number's value?",
            choices: ["a. toString()", "b. valueOf()", "c. toLocaleString", "d. toPrecision()"],
            answer: "b"
        },
        {
            question: "Questions 6 : Which of the following function of String object causes a string to be displayed in fixed-pitch font as if it were in a <tt> tag?",
            choices: ["a. fixed()", "b. big()", "c. blink()", "d. bold"],
            answer: "a"
        },
        {
            question: "Questions 7 : Which of the following function of String object returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order?",
            choices: ["a. localeCompare()", "b. search()", "c. substr()", "d. concat()"],
            answer: "a"
        },
        {
            question: "Questions 8 : Which of the following function of Array object returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found?",
            choices: ["a. indexOf()", "b. join()", "c. lastIndexOf()", "d. map()"],
            answer: "c"
        }
    ];
        //Set variables related to time
    
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    /*Functions*/
        // Countdown for timing the quiz
    function countdown() {
            
            var timerInterval = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "Time is up!"; 
                    // if time is up, show on score board content instead of "all done!"
                    finish.textContent = "Time is up!";
                    gameOver();
    
                } else  if(questionCount >= questionSource.length +1) {
                    clearInterval(timerInterval);
                    gameOver();
                    } 
        }, 1000);
    }
    
        //Starts quiz once button is pressed
    function startQuiz () {
            introduction.style.display = "none";
            questionPage.style.display = "block";
            questionNumber = 0
            countdown();
            showQuestion(questionNumber);
          
    }
        //Shows the questions and choices
    function showQuestion (n) {
            askQuestion.textContent = questionSource[n].question;
            optionBtn1.textContent = questionSource[n].choices[0];
            optionBtn2.textContent = questionSource[n].choices[1];
            optionBtn3.textContent = questionSource[n].choices[2];
            optionBtn4.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    
        //Checks answer user picks
    function checkAnswer(event) {
        event.preventDefault();
        checkChoice.style.display = "block";
        setTimeout(function () {
            checkChoice.style.display = 'none';
        }, 1000);
    
        if (questionSource[questionNumber].answer == event.target.value) {
            checkChoice.textContent = "Correct!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 5;
            checkChoice.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
        }

        if (questionNumber < questionSource.length -1 ) {
            showQuestion(questionNumber +1);
        } else {
        gameOver();
    }
    questionCount++;
    }
        // Game is over when all questions are answered or time runs out
    function gameOver() {
    
            questionPage.style.display = "none";
            highScore.style.display = "block";
            console.log(highScore);
            finalScore.textContent = "Your final score is : " + totalScore ;  
            timeLeft.style.display = "none"; 
    };
    
    // get current score and initials from local storage
    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            freshList = JSON.parse(currentList);
            return freshList;
        } else {
            freshList = [];
        }
        return freshList;
    };
    
    
    // render score to the score board
    function renderScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
        // Shows top 5
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    
    // sort score and ranking the highscores
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else{
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    
    // adding new scores
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
    }
    
    // Button to start the quiz
    startBtn.addEventListener("click", startQuiz);
    
    //click any choices button, go to the next question
    choiceButtons.forEach(function(click){
    
        click.addEventListener("click", checkAnswer);
    });
    
    //save current score and go to next question
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        highScore.style.display = "none";
        intro.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        saveScore();
    });
    
    // check highscore ranking list
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        highScore.style.display = "none";
        intro.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        renderScore();
    });
    
    //go back to main page
    backBtn.addEventListener("click",function(event){
            event.preventDefault();
            highScore.style.display = "none";
            intro.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload();
    });
    
    //clear highscores
    clearBtn.addEventListener("click",function(event) {
        event.preventDefault();
        localStorage.clear();
        renderScore();
    });
    
    