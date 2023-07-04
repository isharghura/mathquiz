const numQuestions = 10;

function generateQuestions(numQuestions) {
    const qs = [];

    for (let i = 0; i < numQuestions; i++) {
        let num1, num2, correctAddAnswer;
        let answerSet = new Set();

        do {
            num1 = Math.floor(Math.random() * 10) - Math.floor(Math.random() * 20);
            num2 = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 20);
            correctAddAnswer = num1 + num2;

            answerSet.add(correctAddAnswer);

            while (answerSet.size < 4) {
                const incorrectAnswer =
                    correctAddAnswer +
                    Math.floor(Math.random() * 11) -
                    Math.floor(Math.random() * 5);
                answerSet.add(incorrectAnswer);
            }
        } while (answerSet.size !== 4);

        const answers = Array.from(answerSet);
        const correctIndex = Math.floor(Math.random() * 4);
        const shuffledAnswers = shuffleArrayWithIndex(answers, correctIndex);

        const question = {
            question: `${num1} + ${num2}`,
            answers: shuffledAnswers.map((answer, index) => ({
                text: `${answer}`,
                correct: index === correctIndex,
                id: `btn${index + 1}`,
            })),
        };

        qs.push(question);
    }

    return qs;
}

function shuffleArrayWithIndex(array, correctIndex) {
    const shuffledArray = array.slice();
    const correctAnswer = shuffledArray[correctIndex];
    shuffledArray[correctIndex] = shuffledArray[0];
    shuffledArray[0] = correctAnswer;
    return shuffledArray;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let questions = generateQuestions(numQuestions);

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerBtns");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Continue";

    questions = generateQuestions(numQuestions);

    showQuestion();
}
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    const shuffledAnswers = shuffleArray([...currentQuestion.answers]);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.id = answer.id;
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", changeBtnBg);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function changeBtnBg(event) {
    const selectedButton = event.target;
    const isButtonCorrect = selectedButton.dataset.correct === "true";

    const answerButtons = document.querySelectorAll(".btn");
    answerButtons.forEach(button => {
        button.disabled = true;
        button.classList.remove("correct", "incorrect");

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }

        if (button === selectedButton && isButtonCorrect) {
            button.classList.add("correct");
            score++;
        }
    });

    nextBtn.style.display = "block";
}

function finalScore() {
    resetState();
    questionElement.innerHTML = `Scored ${score}/${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        finalScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})

startQuiz();