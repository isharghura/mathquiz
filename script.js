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
          const incorrectAnswer = correctAddAnswer + Math.floor(Math.random() * 11) - Math.floor(Math.random() * 5);
          answerSet.add(incorrectAnswer);
        }
      } while (answerSet.size !== 4);
  
      const answers = Array.from(answerSet);
  
      shuffleArray(answers);
  
      const question = {
        question: `${num1} + ${num2}`,
        answers: answers.map((answer, index) => ({
          text: `${answer}`,
          correct: index === 0,
          id: `btn${index + 1}`
        }))
      };
  
      qs.push(question);
    }
  
    return qs;
  }

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = generateQuestions(numQuestions);

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
        button.id = answer.id;
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
        button.classList.remove("correct", "incorrect");
        if (isButtonCorrect) {
            button.classList.add("correct");
            score++;
        }
        else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
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