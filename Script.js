// This code runs when the page content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("quizForm");

  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the question text
    const question = document.getElementById("question").value;

    // Get all the options and their correctness
    const options = Array.from(
      document.querySelectorAll('input[name="option"]')
    ).map((input, index) => ({
      text: input.value,
      isCorrect: document.querySelector(
        `input[name="correct"][value="${index}"]`
      ).checked,
    }));

    // Create the quiz question object
    const quizQuestion = {
      id: Date.now(), // simple unique ID based on timestamp
      question: question,
      options: options,
      explanation: "",
    };

    // Output the quiz question object to console
    console.log(quizQuestion);
    alert("Quiz question created! Check console for output.");
  });

  // Add event listener to each radio button to update colors
  document.querySelectorAll('input[name="correct"]').forEach((radio) => {
    radio.addEventListener("change", updateColors);
  });

  // Function to update colors of options based on correctness
  function updateColors() {
    document
      .querySelectorAll('input[name="option"]')
      .forEach((input, index) => {
        input.classList.remove("correct", "wrong");
        if (
          document.querySelector(`input[name="correct"][value="${index}"]`)
            .checked
        ) {
          input.classList.add("correct");
        } else {
          input.classList.add("wrong");
        }
      });
  }
});

function randomizeOptions() {
  const optionsContainer = document.getElementById("options");
  const options = Array.from(optionsContainer.children);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    optionsContainer.appendChild(options[j]);
  }
}
