const questions = [
    {
        question: "Biggest animal in the world?",
        answers: [
            { text: "shark", correct: false },
            { text: "blue whale", correct: true },
            { text: "shrimp", correct: false },
            { text: "elephant", correct: false }
        ]
    },
    {
        question: "6+6?",
        answers: [
            { text: "12", correct: true },
            { text: "512", correct: false },
            { text: "4", correct: false },
            { text: "64", correct: false }
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("btns");
const nextbtnElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextbtnElement.innerHTML="Continue";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    questionElement.innerHTML=currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz();