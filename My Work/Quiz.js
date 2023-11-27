const Question = [
    {
        myQuestion: "Grand Central Terminal, Park Avenue, New York is the world's. ",
        myAnswer: [
            { text: "largest railway station", correct: true },
            { text: "highest railway station", correct: false },
            { text: "longest railway station", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        myQuestion: "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
        myAnswer: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: true },
            { text: "Europe", correct: false },
            { text: "Australia", correct: false },
        ]
    },
    {
        myQuestion: "Garampani sanctuary is located at",
        myAnswer: [
            { text: "Junagarh, Gujarat", correct: false },
            { text: "Diphu, Assam", correct: true },
            { text: "Kohima, Nagaland", correct: false },
            { text: "Gangtok, Sikkim", correct: false },
        ]
    },
    {
        myQuestion: "For which of the following disciplines is Nobel Prize awarded?",
        myAnswer: [
            { text: "Physics and Chemistry", correct: false },
            { text: "Physiology or Medicine ", correct: false },
            { text: "Literature, Peace and Economics", correct: false },
            { text: "All of the above", correct: true },
        ]
    }
]
const usedQuestion = [10]
const questionBox = document.getElementById("questionBox");
const answerBox = document.getElementById("answerBox")
const nextBtn = document.getElementById("nextBtn")
const playBtn = document.getElementById("playBtn")
let count = 0
let currentQuestionNo = 0
let score = 0;
let randomIndex = 0
function StartQuiz() {
    currentQuestionNo = 0;
    score = 0;
    showQuestion();
}
// function check() {
//     usedQuestion.indexOf(randomIndex)
//     if (usedQuestion.find(elem=>{})) {
//         usedQuestion.push(randomIndex)
//             if (count>=20) {
//                 usedQuestion.shift()
//             }
//             count++
//             console.log(usedQuestion);
//             return
//     }
//     else{
//         randomIndex = randomNumber()
//         check()
//     } 
// }
function randomNumber() {
    let num = Math.floor(Math.random() * Question.length)
    return num
}
function showQuestion() {
    // randomIndex = parseInt(randomNumber())
    // usedQuestion.forEach(element => {
    //     if (randomIndex === element) {
    //         randomIndex = randomNumber()
    //         console.log(randomIndex);
    //     }
    //     else {
    //         usedQuestion.push(randomIndex)
    //         if (count >= 20) {
    //             usedQuestion.shift()
    //         }
    //         count++
    //         console.log(usedQuestion);
    //     }
    // });
    // let currentQuestion = Question[randomIndex]
    let currentQuestion = Question[currentQuestionNo]
    let QuestionNo = currentQuestionNo + 1;
    questionBox.innerHTML = "Question " + QuestionNo + ". " + currentQuestion.myQuestion

    currentQuestion.myAnswer.forEach(Answer => {
        const option = document.createElement("button")
        option.innerHTML = Answer.text
        option.classList.add("btn")
        answerBox.appendChild(option)
        if (Answer.correct) {
            option.dataset.correct = Answer.correct
        }
        option.addEventListener("click", selectedOption)
    })
}
function selectedOption(e) {
    const seletedbtn = e.target
    const isCorrect = seletedbtn.dataset.correct === "true"
    if (isCorrect) {
        seletedbtn.classList.add("correct");
        score++;
    }
    else {
        seletedbtn.classList.add("incorrect")
    }
    Array.from(answerBox.children).forEach(option => {
        if (option.dataset.correct === "true") {
            option.classList.add("correct")
        }
        option.disabled = true
    })
    nextBtn.style.display = "block"
}

nextBtn.addEventListener("click", () => {
    resetButton()
    if (currentQuestionNo < Question.length - 1) {
        currentQuestionNo++;
        showQuestion();
    }
    else {
        showScore();
    }
})
playBtn.addEventListener("click", () => {
    StartQuiz()
    nextBtn.style.display = "none"
    playBtn.style.display = "none"
    document.getElementById("bar").style.display = "none"

})

function resetButton() {
    nextBtn.style.display = "none"
    while (answerBox.firstChild) {
        answerBox.removeChild(answerBox.firstChild);
    }
}
function showScore() {
    questionBox.innerHTML = `your score is ${score} out of ${Question.length} !`
    document.getElementById("bar").style.display = "flex"
    let spercentage = ((score / Question.length) * 100)
    let circle = document.getElementById("circle")
    let dashoff = 472 * (spercentage / 100)
    let c = 472
    let copy = 472
    let number = document.getElementById("number")
    let counter = 0
    let time = setInterval(() => {
        if (c == copy - dashoff) {
            clearInterval(time)
        }
        else {
            c--
            circle.style.strokeDashoffset = c;
        }
    }, 10);

    let time2 = setInterval(() => {
        if (spercentage == 0) {
            number.innerHTML = "Better Luck <br> Next time"
            number.style.fontSize = "1.2rem"
            clearInterval(time2);
        }

        else {
            if (counter == spercentage) {
                clearInterval(time2);
            }
            else {
                counter++
                if (counter == 100) {
                    number.innerHTML = "Excellent <br>" + counter + "%"
                    clearInterval(time2);
                }
                number.innerHTML = counter + "%"
            }
        }
    }, 40);
    nextBtn.style.display = "none"
    playBtn.style.display = "block"
}
StartQuiz()