document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "What would the 3D shape look like from above?",
      image: "spatial_1.png",
      options: ["A", "B", "C", "D"],
      answer: "A",
    },
    {
      question: "Which of the given shapes is the correct mirror image?",
      image: "spatial_2.png",
      options: ["A", "B", "C", "D"],
      answer: "A",
    },
    {
      question:
        "Which of the given shapes is the same 3D shape but in a different position?",
      image: "spatial_3.png",
      options: ["A", "B", "C"],
      answer: "D",
    },
    {
      question:
        "Choose the shape that could be the result if these two shapes were combined and no other changes were made.",
      image: "spatial_4.png",
      options: ["A", "B", "C"],
      answer: "B",
    },
    {
      question: "Which of the boxes comes next in the sequence?",
      image: "spatial_5.png",
      options: ["A", "B", "C", "D", "E"],
      answer: "D",
    },
    {
      question:
        "If the net was folded into a cube, which of the given shapes would it look like?",
      image: "spatial_6.png",
      options: ["A", "B", "C", "D"],
      answer: "D",
    },
    {
      question: " Which of the boxes comes next in the sequence?",
      image: "spatial_7.png",
      options: ["A", "B", "C", "D", "E"],
      answer: "A",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let quizCompleted = false; // Flag to track if quiz has been completed
  const quizContainer = document.getElementById("question-container");

  function createQuestion(question, index) {
    quizContainer.innerHTML = `
                        <div class="question">
                            <p>${question.question}</p>
                            ${
                              question.image
                                ? `<img src="${question.image}" alt="Question Image">`
                                : ""
                            }
                            <ul class="options">
                                ${question.options
                                  .map(
                                    (option, i) =>
                                      `<li><button type="button" data-index="${i}" data-answer="${option
                                        .split(".")[0]
                                        .toLowerCase()}">${option}</button></li>`
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    `;
    const options = quizContainer.querySelectorAll(".options button");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedAnswer = option.getAttribute("data-answer");
        if (selectedAnswer === question.answer.toLowerCase()) {
          score += 1; // Increase score by 1 for each correct answer
        }
        options.forEach((opt) => opt.classList.remove("selected")); // Remove selected class from all options
        option.classList.add("selected"); // Add selected class to the clicked option
        option.disabled = true; // Disable the selected option
        setTimeout(() => {
          nextQuestion();
        }, 1000); // Automatically move to the next question after 1 second
      });
    });

    updateProgressBar();
  }

  function nextQuestion() {
    if (!quizCompleted) {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
      } else {
        quizCompleted = true;
        showScore();
      }
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
    }
  }

  function updateProgressBar() {
    if (currentQuestionIndex >= 0) {
      const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
      document.getElementById("progress").style.width = progress + "%";
    }
  }

  function showScore() {
    const perscore = (score / questions.length) * 100;
    const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
    document.getElementById("score-container").textContent =
      "Your score: " + parseFloat(normalized_score.toFixed(2));
    document.getElementById("submit-btn").style.display = "none"; // Hide the submit button
  }

  document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("prev-btn").style.display = "inline-block"; // Show the prev button
    document.getElementById("next-btn").style.display = "inline-block"; // Show the next button
    createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
  });

  document
    .getElementById("aptitudeTestForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });

  document.getElementById("prev-btn").addEventListener("click", prevQuestion);
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
});
