document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
          question: "If a car travels at a speed of 60 miles per hour how far will it travel in 2.5 hours?",
          options: ["A. 125 miles", "B. 150 miles", "C. 175 miles", "D. 200 miles."],
          answer: "b",
        },
        {
          question: "If a rectangular garden measures 12 meters in length and 8 meters in width, what is the area of the garden?",
          
          options: ["A. 80 square meters", "B. 96 square meters", "C. 104 square meters", "D. 120 square meters"],
          answer: "b",
        },
        {
          question: "If a recipe calls for 2 cups of flour to make 12 cookies, how many cups of flour are needed to make 36 cookies?",
          
          options: ["A. 4 cups", "B. 6 cups", "C. 8 cups", "D. 12 cups"],
          answer: "b",
        },
        {
          question: "If 30% of the students in a class are girls, and there are 24 boys, how many students are in the class in total?",
        
          options: ["A. 40", "B. 50", "C. 60", "D. 70"],
          answer: "c",
        },
        {
          question: "A store sells a product for $20, and the cost to produce each unit is $12. What is the store's profit per unit?",
         
          options: ["A. $4", "B. $6", "C. $8", "D. $10"],
          answer: "b",
        },
        {
          question: " A box contains 24 red balls, 36 blue balls, and 40 green balls. What is the probability of selecting a blue ball randomly?",
          
          options: ["A. 1/4", "B. 1/3", "C. 1/2", "D. 2/3"],
          answer: "b",
        },
        {
          question: "If 5/8 of a number is 35, what is the number?",
          options: ["A. 56", "B. 45", "C. 55", "D. 40"],
          answer: "a",
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