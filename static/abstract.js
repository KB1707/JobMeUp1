document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "Which of the following pairs of words is most similar to the relationship between 'tree' and 'leaf'?",
      options: ["A.Flower", "B.Car", "C.Page", "D.Tail"],
      answer: "A",
    },
    {
      question:
        "Identify the missing pattern in the sequence: 3, 6, 12, 24, ...'",
      options: ["A.36", "B.30", "C.48", "D.18"],
      answer: "C",
    },
    {
      question:
        "If all dogs have tails, and Max is a dog, what can we conclude?",
      options: [
        "A.Max has a tail.",
        "B.Not all dogs have tails",
        "C.Cats have tails too.",
        "D. None of the above.",
      ],
      answer: "A",
    },
    {
      question: "Find the odd one out?",
      options: ["A.Elephant", "B.Giraffe", "C.Lion", "D.Tiger"],
      answer: "C",
    },
    {
      question:
        "What is the next number in the sequence: 1, 4, 9, 16, 25, ...?",
      options: ["A.36", "B.49", "C.64", "D.81"],
      answer: "C",
    },
    {
      question: "Find the odd one out:",
      options: ["A.Circle", "B.Square", "C.Triangle", "D.Sphere"],
      answer: "D",
    },
    {
      question: "Complete the analogy: Tree is to leaf as flower is to ___",
      options: ["A.Petal", "B.Stem", "C.Root", "D.Branch"],
      answer: "A",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let quizCompleted = false; // Flag to track if quiz has been completed
  const quizContainer = document.getElementById("question-container-7");

  function createQuestion(question, index) {
    quizContainer.innerHTML = `
                        <div class="question-7">
                            <p>${question.question}</p>
                            <ul class="options-7">
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

    const options = quizContainer.querySelectorAll(".options-7 button");
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

  document.getElementById("next-btn-7").addEventListener("click", nextQuestion);

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
    }
  }

  function updateProgressBar() {
    if (currentQuestionIndex >= 0) {
      const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
      document.getElementById("progress-7").style.width = progress + "%";
    }
  }

  function showScore() {
    const perscore = (score / questions.length) * 100;
    const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
    document.getElementById("score-container-7").textContent =
      "Your score: " + parseFloat(normalized_score.toFixed(2));
    document.getElementById("submit-btn-7").style.display = "none"; // Hide the submit button
  }

  document.getElementById("start-btn-7").addEventListener("click", () => {
    document.getElementById("start-btn-7").style.display = "none";
    document.getElementById("prev-btn-7").style.display = "inline-block"; // Show the prev button
    document.getElementById("next-btn-7").style.display = "inline-block"; // Show the next button
    createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
  });

  document
    .getElementById("aptitudeTestForm-7")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });

  document.getElementById("prev-btn-7").addEventListener("click", prevQuestion);
  document.getElementById("next-btn-7").addEventListener("click", nextQuestion);
});
