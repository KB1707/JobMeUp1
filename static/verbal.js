document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "Analogies: Complete the analogy: Dog is to puppy as cat is to _",
      options: ["A.kitten", "B.cub", "C.calf", "D.foal"],
      answer: "A",
    },
    {
      question:
        "Sentence Completion: Fill in the blank to complete the sentence: 'The ____ of the novel left readers eagerly awaiting the sequel'",
      options: ["A.climax", "B.conclusion", "C.prologue", "D.epilogue"],
      answer: "B",
    },
    {
      question:
        "Critical Reasoning: Which of the following statements weakens the argument the most? 'All cats are mammals. Mittens is a cat. Therefore, Mittens is a mammal.'",
      options: [
        "A.Some mammals are not cats.",
        "B.Mittens is a Siamese cat.",
        "C.Dogs are also mammals.",
        "D.Birds are not mammals.",
      ],
      answer: "C",
    },
    {
      question: "Analogical Reasoning: If CLOUD is to RAIN, then SUN is to:",
      options: ["A.Day", "B.Night", "C.Warmth", "D.Shine"],
      answer: "A",
    },
    {
      question:
        "Logical Deduction: If all flowers are plants and some plants are trees, then it must be true that:",
      options: [
        "A.Some flowers are trees",
        "B.All trees are plants",
        "C.Some trees are flowers",
        "D.All flowers are trees",
      ],
      answer: "B",
    },
    {
      question:
        " Find the two words that best complete the following sentence: Though the movie received _______ reviews, the audience seemed to _______ it",
      options: [
        "A.mixed, enjoy",
        "B.positive, hate",
        "C.negative, love",
        "D.neutral, dislike",
      ],
      answer: "A",
    },
    {
      question:
        "Identify the relationship between the following pair of words: MILE : DISTANCE",
      options: [
        "A.weight : pound",
        "B.height : inch",
        "C. degree : temperature",
        "D.volume : gallon",
      ],
      answer: "C",
    },
  ];

  let currentQuestionIndex = 0;
    let score = 0;
    let quizCompleted = false; // Flag to track if quiz has been completed
    const quizContainer = document.getElementById("question-container-6");
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
                <div class="question-6">
                    <p>${question.question}</p>
                    <ul class="options-6">
                        ${question.options
                            .map(
                                (option, i) =>
                                    `<li><button type="button" data-index="${i}" data-answer="${option
                                        .split(".")[0]
                                        .toLowerCase()}" ${selectedOptions[index] === i ? 'class="selected"' : ''}>${option}</button></li>`
                            )
                            .join("")}
                    </ul>
                    <button id="submit-btn-6">Submit</button>
                </div>
            `;
            
            // Handle submit button click
            document.getElementById("submit-btn-6").addEventListener("click", () => {
                quizCompleted = true;
                showScore();
                // Remove event listener for the previous button after submitting
                document.getElementById("prev-btn-6").removeEventListener("click", prevQuestion);
                document.getElementById("prev-btn-6").style.display = "none";
                document.getElementById("next-btn-6").style.display = "none";

            });
        } else {
            // Regular question, display as usual
            quizContainer.innerHTML = `
                <div class="question-6">
                    <p>${question.question}</p>
                    <ul class="options-6">
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
    
        const options = quizContainer.querySelectorAll(".options-6 button");
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

    document.getElementById("next-btn-6").addEventListener("click", nextQuestion);

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
        }
    }

    document.getElementById("prev-btn-6").addEventListener("click", prevQuestion);

    function updateProgressBar() {
        if (currentQuestionIndex >= 0) {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById("progress-6").style.width = progress + "%";
        }
    }

    function showScore() {
        if (quizCompleted) {
            const perscore = (score / (questions.length * 2)) * 100;
            const normalized_score = ((perscore - 0) * (10 - 1)) / (100 - 0) + 1;
            document.getElementById("score-container-6").textContent =
                "Your score: " + parseFloat(normalized_score.toFixed(2));
        }
    }

    document.getElementById("start-btn-6").addEventListener("click", () => {
        setTimeout(() => {
            document.getElementById("start-btn-6").style.display = "none";
            document.getElementById("prev-btn-6").style.display = "inline-block";
            document.getElementById("next-btn-6").style.display = "inline-block";
            createQuestion(questions[currentQuestionIndex], currentQuestionIndex);
        }, 1000);
    });

    document
        .getElementById("aptitudeTestForm-6")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });

    document.getElementById("prev-btn-6").addEventListener("click", prevQuestion);
    document.getElementById("next-btn-6").addEventListener("click", nextQuestion);
});