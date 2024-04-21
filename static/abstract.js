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
                <div class="question-7">
                    <p>${question.question}</p>
                    ${
                      question.image
                        ? `<img src="${question.image}" alt="Question Image">`
                        : ""
                    }
                    <ul class="options-7">
                        ${question.options
                            .map(
                                (option, i) =>
                                    `<li><button type="button" data-index="${i}" data-answer="${option
                                        .split(".")[0]
                                        .toLowerCase()}" ${selectedOptions[index] === i ? 'class="selected"' : ''}>${option}</button></li>`
                            )
                            .join("")}
                    </ul>
                    <button id="submit-btn-7">Submit</button>
                </div>
            `;
            
            // Handle submit button click
            document.getElementById("submit-btn-7").addEventListener("click", () => {
                quizCompleted = true;
                showScore();
                // Remove event listener for the previous button after submitting
                document.getElementById("prev-btn-7").removeEventListener("click", prevQuestion);
                document.getElementById("prev-btn-7").style.display = "none";
                document.getElementById("next-btn-7").style.display = "none";

            });
        } else {
            // Regular question, display as usual
            quizContainer.innerHTML = `
                <div class="question-7">
                    <p>${question.question}</p>
                    ${
                      question.image
                        ? `<img src="${question.image}" alt="Question Image">`
                        : ""
                    }
                    <ul class="options-7">
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
    
        const options = quizContainer.querySelectorAll(".options-7 button");
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

    document.getElementById("next-btn-7").addEventListener("click", nextQuestion);

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
        }
    }

    document.getElementById("prev-btn-7").addEventListener("click", prevQuestion);

    function updateProgressBar() {
        if (currentQuestionIndex >= 0) {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById("progress-7").style.width = progress + "%";
        }
    }

    function showScore() {
        if (quizCompleted) {
            const perscore = (score / (questions.length * 2)) * 100;
            const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
            document.getElementById("score-container-7").textContent =
                "Your score: " + parseFloat(normalized_score.toFixed(2));
        }
    }

    document.getElementById("start-btn-7").addEventListener("click", () => {
        setTimeout(() => {
            document.getElementById("start-btn-7").style.display = "none";
            document.getElementById("prev-btn-7").style.display = "inline-block";
            document.getElementById("next-btn-7").style.display = "inline-block";
            createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
        }, 1000);
    });

    document
        .getElementById("aptitudeTestForm-7")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });

    document.getElementById("prev-btn-7").addEventListener("click", prevQuestion);
    document.getElementById("next-btn-7").addEventListener("click", nextQuestion);
});
