document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "Choose the correct top view.",
      image: "static/perceptual-img1.jpg",
      options: ["A", "B", "C", "D"],
      answer: "C",
    },
    {
      question: "In figure A, how many cubes have 3 of their sides painted?",
      image: "static/perceptual-img2.jpg",
      options: ["A.4", "B.5", "C.6", "D.7"],
      answer: "C",
    },
    {
      question: "Choose the correct option?",
      image: "static/perceptual-img3.jpg",
      options: ["A", "B", "C", "D"],
      answer: "A",
    },
    {
      question: "Choose the correct option?",
      image: "static/perceptual-img4.jpg",
      options: ["A", "B", "C", "D"],
      answer: "B",
    },
    {
      question: "Choose the correct FRONT VIEW",
      image: "static/perceptual-img5.jpg",
      options: ["A", "B", "C", "D"],
      answer: "D",
    },
    {
      question: " Choose the correct option",
      image: "static/perceptual-img6.jpg",
      options: ["A", "B", "C", "D"],
      answer: "D",
    },
    {
      question: "Arrange in increasing order of angle magnitude",
      image: "static/perceptual-img7.jpg",
      options: [
        "A. 2 - 1 - 3 - 4",
        "B. 1 - 2 - 3 - 4",
        "C. 3 - 2 - 1 - 4",
        "D. 2 - 3 - 1 - 4",
      ],
      answer: "D",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let quizCompleted = false; // Flag to track if quiz has been completed
  const quizContainer = document.getElementById("question-container-8");

  function createQuestion(question, index) {
    quizContainer.innerHTML = `
                        <div class="question-8">
                            <p>${question.question}</p>
                            ${
                              question.image
                                ? `<img src="${question.image}" alt="Question Image">`
                                : ""
                            }
                            <ul class="options-8">
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

    const options = quizContainer.querySelectorAll(".options-8 button");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedAnswer = option.getAttribute("data-answer");
        if (selectedAnswer === question.answer.toLowerCase()) {
          score += 1; // Increase score by 1 for each correct answer
        }
        options.forEach((opt) => opt.classList.remove("selected")); // Remove selected class from all options
        option.classList.add("selected"); // Add selected class to the clicked option
        option.disabled = true; // Disable the selected option
        // Automatically move to the next question after 1 second
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

  document.getElementById("next-btn-8").addEventListener("click", nextQuestion);

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
    }
  }

  function updateProgressBar() {
    if (currentQuestionIndex >= 0) {
      const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
      document.getElementById("progress-8").style.width = progress + "%";
    }
  }

  function showScore() {
    const perscore = (score / questions.length) * 100;
    const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
    document.getElementById("score-container-8").textContent =
      "Your score: " + parseFloat(normalized_score.toFixed(2));
    document.getElementById("submit-btn-8").style.display = "none"; // Hide the submit button
  }

  document.getElementById("start-btn-8").addEventListener("click", () => {
    document.getElementById("start-btn-8").style.display = "none";
    document.getElementById("prev-btn-8").style.display = "inline-block"; // Show the prev button
    document.getElementById("next-btn-8").style.display = "inline-block"; // Show the next button
    createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
  });

  document
    .getElementById("aptitudeTestForm-8")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });

  document.getElementById("prev-btn-8").addEventListener("click", prevQuestion);
  document.getElementById("next-btn-8").addEventListener("click", nextQuestion);
});
