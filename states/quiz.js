document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-quiz");
    const feedback = document.getElementById("quiz-feedback");
    const answers = {
        q1: "b",
        q2: "b",
        q3: "c",
        q4: "a",
        q5: "c",
        q6: "b",
        q7: "b",
        q8: "a",
        q9: "b",
        q10: "c"
    };
    const userAnswers = {};

    // Функція для вибору відповіді
    window.selectAnswer = function(question, answer) {
        userAnswers[question] = answer;
        const buttons = document.querySelectorAll(`button[onclick="selectAnswer('${question}', 'a')"],
                                                button[onclick="selectAnswer('${question}', 'b')"],
                                                button[onclick="selectAnswer('${question}', 'c')"]`);
        buttons.forEach(btn => btn.classList.remove('selected'));
        const selectedButton = document.querySelector(`button[onclick="selectAnswer('${question}', '${answer}')"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        let score = 0;
        const total = 10;

        for (let question in answers) {
            if (userAnswers[question] === answers[question]) {
                score++;
            }
        }

        // Підсвічування відповідей
        for (let question in answers) {
            const selectedAnswer = userAnswers[question];
            const correctAnswer = answers[question];

            const selectedButton = document.querySelector(`button[onclick="selectAnswer('${question}', '${selectedAnswer}')"]`);
            const correctButton = document.querySelector(`button[onclick="selectAnswer('${question}', '${correctAnswer}')"]`);

            if (selectedAnswer === correctAnswer) {
                if (selectedButton) {
                    selectedButton.classList.add('correct-answer');
                }
            } else {
                if (selectedButton) {
                    selectedButton.classList.add('incorrect-answer');
                }
                if (correctButton) {
                    correctButton.classList.add('correct-answer');
                }
            }

            const buttons = document.querySelectorAll(`button[onclick^="selectAnswer('${question}')"]`);
            buttons.forEach(btn => btn.disabled = true);
        }

        let message = "";
        if (score === total) {
            message = `<i class="fas fa-check-circle"></i> Excellent! You answered all questions correctly.`;
            feedback.classList.add("correct");
            feedback.classList.remove("incorrect");
        } else if (score >= total / 2) {
            message = `<i class="fas fa-info-circle"></i> Good job! You got ${score} out of ${total} correct.`;
            feedback.classList.add("correct");
            feedback.classList.remove("incorrect");
        } else {
            message = `<i class="fas fa-times-circle"></i> You got ${score} out of ${total} correct. Keep studying!`;
            feedback.classList.add("incorrect");
            feedback.classList.remove("correct");
        }

        feedback.innerHTML = message;
        feedback.style.display = "block";
        submitButton.disabled = true;
    });
});
