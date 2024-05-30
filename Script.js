const questions = [];

document
  .getElementById("quizForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Initialize the quizQuestion object empty
    const quizQuestion = {
      id: questions.length + 1, // Set this dynamically as needed
      question: "",
      options: [], // Initialize options as an empty array
    };

    // Populate the quizQuestion object with form data
    quizQuestion.question = document.getElementById("question").value;

    const answers = [
      { text: document.getElementById("answer1").value, id: "answer1" },
      { text: document.getElementById("answer2").value, id: "answer2" },
      { text: document.getElementById("answer3").value, id: "answer3" },
      { text: document.getElementById("answer4").value, id: "answer4" },
    ];

    answers.forEach((answer) => {
      const isCorrect = document.querySelector(
        `input[name="correct"][value="${answer.id}"]`
      ).checked;
      quizQuestion.options.push({ text: answer.text, isCorrect: isCorrect });
    });

    // Add the new question to the questions array
    questions.push(quizQuestion);

    // Log the object to the console (or handle it as needed)
    console.log(quizQuestion);

    // Display the updated list of questions
    displayQuestions();
  });

document
  .getElementById("randomizeButton")
  .addEventListener("click", function () {
    const options = [
      document.getElementById("answer1").parentElement,
      document.getElementById("answer2").parentElement,
      document.getElementById("answer3").parentElement,
      document.getElementById("answer4").parentElement,
    ];

    // Shuffle the options array
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    // Append the shuffled options back to the form
    const form = document.getElementById("quizForm");
    options.forEach((option) => {
      form.insertBefore(option, document.querySelector(".buttons"));
    });
  });

document.getElementById("searchButton").addEventListener("click", function () {
  const searchQuery = prompt("Enter search query:");
  displayQuestions(searchQuery);
});

function displayQuestions(searchQuery = "") {
  const questionList = document.getElementById("questionList");
  questionList.innerHTML = "";

  questions
    .filter((question) => question.question.includes(searchQuery))
    .forEach((question, index) => {
      const questionItem = document.createElement("div");
      questionItem.classList.add("question-item");

      let optionsHtml = "";
      question.options.forEach((option, i) => {
        optionsHtml += `<p>Option ${i + 1}: ${option.text}</p>`;
      });

      questionItem.innerHTML = `
        <p>Question ${index + 1}: ${question.question}</p>
        ${optionsHtml}
        <button onclick="revealAnswer(${index})">Reveal Answer</button>
        <div id="answer${index}" class="answer"></div>
      `;

      questionList.appendChild(questionItem);
    });
}

function revealAnswer(index) {
  const answerDiv = document.getElementById(`answer${index}`);
  const correctOption = questions[index].options.find(
    (option) => option.isCorrect
  );
  answerDiv.innerHTML = `<p class="correct-answer">Correct Answer: ${correctOption.text}</p>`;
}
