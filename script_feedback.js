// script_feedback.js

document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackInput = document.getElementById("feedback");
    const previousFeedback = document.getElementById("previous-feedback");

    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки

        // Отримуємо дані форми
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const feedback = feedbackInput.value.trim();

        // Простий валідатор електронної пошти
        if(email !== ""){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                alert("Будь ласка, введіть дійсну електронну адресу.");
                return;
            }
        }

        if(feedback === "") {
            alert("Будь ласка, введіть свій відгук.");
            return;
        }

        // Створюємо об'єкт для передачі даних
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('feedback', feedback);

        // Відправляємо дані на сервер за допомогою Fetch API
        fetch('submit_feedback.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if(data.startsWith("success")) {
                displayMessage("Дякуємо за ваш відгук!", "correct");
                feedbackForm.reset();
                // Додати новий коментар до списку без перезавантаження сторінки
                loadFeedback();
            } else {
                displayMessage(data, "incorrect"); // Відображає детальну помилку
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage("Виникла помилка при відправці вашого відгуку. Спробуйте ще раз.", "incorrect");
        });
    });

    // Функція для завантаження коментарів
    function loadFeedback() {
        fetch('feedback.txt')
            .then(response => response.text())
            .then(data => {
                displayFeedback(data);
            })
            .catch(error => {
                console.error('Error loading feedback:', error);
            });
    }

    // Функція для відображення коментарів
    function displayFeedback(data) {
        previousFeedback.innerHTML = ""; // Очистити поточні коментарі
        const comments = data.split('\n').filter(line => line.trim() !== '');
        if(comments.length === 0){
            previousFeedback.innerHTML = "<p>There are no reviews yet. Be the first one to leave a comment!</p>";
            return;
        }
        comments.forEach(comment => {
            const parts = comment.split('|');
            const name = parts[0] ? parts[0] : "Anonymous";
            const email = parts[1] ? parts[1] : "";
            const msg = parts[2] ? parts[2] : "";
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            if(name){
                const nameP = document.createElement('p');
                nameP.innerHTML = `<strong>${name}</strong>`;
                commentDiv.appendChild(nameP);
            }
            if(email){
                const emailP = document.createElement('p');
                emailP.innerHTML = `<em>${email}</em>`;
                commentDiv.appendChild(emailP);
            }
            const msgP = document.createElement('p');
            msgP.textContent = msg;
            commentDiv.appendChild(msgP);
            previousFeedback.appendChild(commentDiv);
        });
    }

    // Функція для відображення повідомлень
    function displayMessage(message, type) {
        const feedback = document.createElement('div');
        feedback.classList.add('feedback', type);
        feedback.innerHTML = message;
        previousFeedback.prepend(feedback);
        feedback.style.display = "block";
        // Автоматичне видалення повідомлення через 5 секунд
        setTimeout(() => {
            feedback.remove();
        }, 5000);
    }

    // Завантажити коментарі при завантаженні сторінки
    loadFeedback();
});
