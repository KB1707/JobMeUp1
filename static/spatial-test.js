document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "What would the 3D shape look like from above?",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_1.png",
      options: ["A", "B", "C", "D"],
      answer: "A",
    },
    {
      question: "Which of the given shapes is the correct mirror image?",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_2.png",
      options: ["A", "B", "C", "D"],
      answer: "A",
    },
    {
      question:
        "Which of the given shapes is the same 3D shape but in a different position?",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_3.png",
      options: ["A", "B", "C"],
      answer: "D",
    },
    {
      question:
        "Choose the shape that could be the result if these two shapes were combined and no other changes were made.",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_4.png",
      options: ["A", "B", "C"],
      answer: "B",
    },
    {
      question: "Which of the boxes comes next in the sequence?",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_5.png",
      options: ["A", "B", "C", "D", "E"],
      answer: "D",
    },
    {
      question:
        "If the net was folded into a cube, which of the given shapes would it look like?",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_6.png",
      options: ["A", "B", "C", "D"],
      answer: "D",
    },
    {
      question: " Which of the boxes comes next in the sequence?",
      image: "/Sidharth/scrollable page/dist/Spatial images/spatial_7.png",
      options: ["A", "B", "C", "D", "E"],
      answer: "A",
    },
  ];

  let currentQuestionIndex = 0;
    let score = 0;
    let quizCompleted = false; // Flag to track if quiz has been completed
    const quizContainer = document.getElementById("question-container-5");
    let selectedOptions = []; // Array to store selected options
    let prevSelectedOption = null; // Variable to store previously selected option
    let correctAnswers = []; // Array to store correct answers

    // Initialize correct answers array
    questions.forEach((question) => {
        correctAnswers.push(question.answer.toLowerCase());
    });

    function createQuestion(question, index) {
        if (index === questions.length - 1) {
            // Last question, show submit button instead
            quizContainer.innerHTML = `
                <div class="question-5">
                    <p>${question.question}</p>
                    ${
                      question.image
                        ? `<img src="${question.image}" alt="Question Image">`
                        : ""
                    }
                    <ul class="options-5">
                        ${question.options
                            .map(
                                (option, i) =>
                                    `<li><button type="button" data-index="${i}" data-answer="${option
                                        .split(".")[0]
                                        .toLowerCase()}" ${selectedOptions[index] === i ? 'class="selected"' : ''}>${option}</button></li>`
                            )
                            .join("")}
                    </ul>
                    <button id="submit-btn-5">Submit</button>
                </div>
            `;
            
            // Handle submit button click
            document.getElementById("submit-btn-5").addEventListener("click", () => {
                quizCompleted = true;
                showScore();
                // Remove event listener for the previous button after submitting
                document.getElementById("prev-btn-5").removeEventListener("click", prevQuestion);
                document.getElementById("prev-btn-5").style.display = "none";
                document.getElementById("next-btn-5").style.display = "none";

            });
        } else {
            // Regular question, display as usual
            quizContainer.innerHTML = `
                <div class="question-5">
                    <p>${question.question}</p>
                    ${
                      question.image
                        ? `<img src="${question.image}" alt="Question Image">`
                        : ""
                    }
                    <ul class="options-5">
                        ${question.options
                            .map(
                                (option, i) =>
                                    `<li><button type="button" data-index="${i}" data-answer="${option
                                        .split(".")[0]
                                        .toLowerCase()}" ${selectedOptions[index] === i ? 'class="selected"' : ''}>${option}</button></li>`
                            )
                            .join("")}
                    </ul>
                </div>
            `;
        }
    
        const options = quizContainer.querySelectorAll(".options-5 button");
        options.forEach((option, i) => {
            option.addEventListener("click", () => {
                const selectedAnswer = option.getAttribute("data-answer");
                if (prevSelectedOption !== null && prevSelectedOption === correctAnswers[index] && selectedAnswer !== correctAnswers[index]) {
                    // Deduct score only if the previous option was correct and now changed to wrong, and score is greater than 0
                    if (score > 0) {
                        score -= 2;
                    }
                }
                if (selectedAnswer === correctAnswers[index]) {
                    score += 2; // Increase score by 2 for each correct answer
                }
                options.forEach((opt) => opt.classList.remove("selected")); // Remove selected class from all options
                option.classList.add("selected"); // Add selected class to the clicked option
                option.disabled = true; // Disable the selected option
                selectedOptions[index] = i; // Store the index of the selected option
                prevSelectedOption = selectedAnswer; // Update the previous selected option
                showScore(); // Update score display after answering
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

    document.getElementById("next-btn-5").addEventListener("click", nextQuestion);

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
        }
    }

    document.getElementById("prev-btn-5").addEventListener("click", prevQuestion);

    function updateProgressBar() {
        if (currentQuestionIndex >= 0) {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById("progress-5").style.width = progress + "%";
        }
    }

    function showScore() {
        if (quizCompleted) {
            const perscore = (score / (questions.length * 2)) * 100;
            const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
            document.getElementById("score-container-5").textContent =
                "Your score: " + parseFloat(normalized_score.toFixed(2));
        }
    }

    document.getElementById("start-btn-5").addEventListener("click", () => {
        setTimeout(() => {
            document.getElementById("start-btn-5").style.display = "none";
            document.getElementById("prev-btn-5").style.display = "inline-block";
            document.getElementById("next-btn-5").style.display = "inline-block";
            createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
        }, 1000);
    });

    document
        .getElementById("aptitudeTestForm-5")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });

    document.getElementById("prev-btn-5").addEventListener("click", prevQuestion);
    document.getElementById("next-btn-5").addEventListener("click", nextQuestion);
});
