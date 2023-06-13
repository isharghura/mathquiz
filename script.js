const questions = [
    {
        question: "6+6",
        answers: [
            { text: "12", correct: true, id: "btn1" },
            { text: "512", correct: false, id: "btn2" },
            { text: "21", correct: false, id: "btn3" },
            { text: "15", correct: false, id: "btn4" },
        ]
    },
    {
        question: "4+6",
        answers: [
            { text: "18", correct: false, id: "btn1" },
            { text: "212", correct: false, id: "btn2" },
            { text: "10", correct: true, id: "btn3" },
            { text: "135", correct: false, id: "btn4" },
        ]
    }
]

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerBtns");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Continue";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.id = answer.id; // Assign custom ID or generate default ID
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", changeBtnBg);
    })
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function changeBtnBg() {
    const answerButtons = document.querySelectorAll(".btn");
    answerButtons.forEach(button => {
        const isButtonCorrect = button.dataset.correct === "true";
        button.classList.remove("correct", "incorrect"); // Remove existing classes
        if (!isButtonCorrect) {
            button.classList.add("incorrect");
        }
        else {
            button.classList.add("correct");
            score++;
        }
        button.disabled=true;
    });
    nextBtn.style.display="block";
}

function finalScore(){
    resetState();
    questionElement.innerHTML=`Scored ${score}/${questions.length}!`;
    nextBtn.innerHTML="Play Again!";
    nextBtn.style.display="block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        finalScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();