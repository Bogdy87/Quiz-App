const quizQuestions = [
  {
    id: 1,
    question:
      "What is the output of the following JavaScript code?\n\nconsole.log(typeof null);",
    options: [
      { text: "undefined", isCorrect: false },
      { text: "null", isCorrect: false },
      { text: "object", isCorrect: true },
      { text: "string", isCorrect: false },
    ],
    explanation:
      "The output of `typeof null` is 'object' because in JavaScript, `null` is considered an object type due to a bug in the original implementation of JavaScript.",
  },
  {
    id: 2,
    question: "Which of the following is a JavaScript framework?",
    options: [
      { text: "Django", isCorrect: false },
      { text: "Flask", isCorrect: false },
      { text: "Angular", isCorrect: true },
      { text: "Laravel", isCorrect: false },
    ],
    explanation: "Angular is a JavaScript framework maintained by Google.",
  },
  {
    id: 3,
    question:
      "What is the result of the following code?\n\nconsole.log(2 + '2');",
    options: [
      { text: "22", isCorrect: true },
      { text: "4", isCorrect: false },
      { text: "NaN", isCorrect: false },
      { text: "undefined", isCorrect: false },
    ],
    explanation:
      "In JavaScript, when a number is added to a string, the number is coerced into a string, resulting in string concatenation.",
  },
];

let currentQuestionIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quizContainer");
  const explanationDiv = document.getElementById("explanation");

  function displayQuiz() {
    quizContainer.innerHTML = ""; // Clear previous content
    explanationDiv.textContent = ""; // Clear previous explanation

    const questionElement = document.createElement("h2");
    questionElement.textContent = quizQuestions[currentQuestionIndex].question;
    quizContainer.appendChild(questionElement);

    quizQuestions[currentQuestionIndex].options.forEach((option, index) => {
      const optionContainer = document.createElement("div");
      optionContainer.classList.add("option-container");

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "quizOption";
      radioInput.value = index;
      radioInput.id = "option" + index;

      const label = document.createElement("label");
      label.htmlFor = "option" + index;
      label.textContent = option.text;

      optionContainer.appendChild(radioInput);
      optionContainer.appendChild(label);
      quizContainer.appendChild(optionContainer);
    });
  }

  function randomizeOptions() {
    quizQuestions[currentQuestionIndex].options.sort(() => Math.random() - 0.5);
    displayQuiz();
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuiz();
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      displayQuiz();
    }
  }

  function submitQuiz() {
    const selectedOption = document.querySelector(
      'input[name="quizOption"]:checked'
    );

    if (!selectedOption) {
      explanationDiv.textContent = "Please select an answer.";
      return;
    }

    const selectedIndex = parseInt(selectedOption.value);
    const isCorrect =
      quizQuestions[currentQuestionIndex].options[selectedIndex].isCorrect;

    document
      .querySelectorAll('input[name="quizOption"]')
      .forEach((input, idx) => {
        const parentDiv = input.parentElement;
        if (quizQuestions[currentQuestionIndex].options[idx].isCorrect) {
          parentDiv.classList.add("correct");
          parentDiv.classList.remove("wrong");
        } else {
          parentDiv.classList.add("wrong");
          parentDiv.classList.remove("correct");
        }
      });

    if (isCorrect) {
      explanationDiv.textContent =
        "Correct! " + quizQuestions[currentQuestionIndex].explanation;
    } else {
      explanationDiv.textContent =
        "Wrong! " + quizQuestions[currentQuestionIndex].explanation;
    }
  }

  displayQuiz();

  window.randomizeOptions = randomizeOptions;
  window.previousQuestion = previousQuestion;
  window.nextQuestion = nextQuestion;
  window.submitQuiz = submitQuiz;
});
