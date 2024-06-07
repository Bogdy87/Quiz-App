const questions = [];
let players = [];
let playerPoints = {};

// Functions to add a new quiz question
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

// Function to randomize options order
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

// Function to start the quiz
document.getElementById("startQuiz").addEventListener("click", function () {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;

  if (player1.trim() === "" || player2.trim() === "") {
    alert("Please enter names for both players.");
    return;
  }

  players = [player1, player2];
  playerPoints = {};
  playerPoints[player1] = 0;
  playerPoints[player2] = 0;

  updateScoreboard();
});

// Function to update the scoreboard
function updateScoreboard() {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = "<h2>Scoreboard</h2>";

  players.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.classList.add("player-item");
    playerElement.innerHTML = `
            <p>${player}: ${playerPoints[player]} points</p>
            <button onclick="updatePoints('${player}', true)">Correct</button>
            <button onclick="updatePoints('${player}', false)">Wrong</button>
        `;
    scoreboard.appendChild(playerElement);
  });
}

// Function to update player points
function updatePoints(player, isCorrect) {
  if (isCorrect) {
    playerPoints[player]++;
  } else {
    const otherPlayer = players.find((p) => p !== player);
    playerPoints[otherPlayer]++;
  }

  updateScoreboard();

  // Check if any player reached 10 points
  if (playerPoints[player] >= 10 || playerPoints[otherPlayer] >= 10) {
    alert(`${player} wins! Game Over.`);

    const winSound = document.getElementById("winSound");
    winSound.play();
  }
}

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", function () {
  const searchQuery = document.getElementById("searchInput").value;
  displayQuestions(searchQuery);
});

// Function to display questions
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

// Function to reveal correct answer
function revealAnswer(index) {
  const answerDiv = document.getElementById(`answer${index}`);
  const correctOption = questions[index].options.find(
    (option) => option.isCorrect
  );
  answerDiv.innerHTML = `<p class="correct-answer">Correct Answer: ${correctOption.text}</p>`;
  const winSound = document.getElementById("winSound");
  winSound.play();
}
