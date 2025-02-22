<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback - The First 13 American States</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrQdP2v6/UYbVx3AnWDrjH2UY6j6VMnVq3E13ujc0nBt8N3p19KcfmGqOk4GJqI6gZr30HBwSxGjkL7ZsQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="styles_feedback.css">
</head>
<body>
    <!-- Header Section -->
    <header>
        <div class="container">
            <h2 class="history-header">
                <a href="../main.html" class="main-header-link" aria-label="Перейти на головну сторінку">The First 13 American States</a>
            </h2>
            <p>Share your thoughts and feedback about our project...</p>
        </div>
    </header>

    <!-- Navigation Bar -->
    <nav>
        <div class="container">
            <span class="toggle-button" aria-label="Toggle Navigation Menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </span>
            <ul class="nav-menu">
                <li><a href="introduction.html">Introduction</a></li>
                <li class="dropdown">
                    <a href="#states" class="dropbtn">States <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                        <a href="states/delaware.html">Delaware</a>
                        <a href="states/pennsylvania.html">Pennsylvania</a>
                        <a href="states/new-jersey.html">New Jersey</a>
                        <a href="states/georgia.html">Georgia</a>
                        <a href="states/connecticut.html">Connecticut</a>
                        <a href="states/massachusetts.html">Massachusetts</a>
                        <a href="states/maryland.html">Maryland</a>
                        <a href="states/south-carolina.html">South Carolina</a>
                        <a href="states/new-hampshire.html">New Hampshire</a>
                        <a href="states/virginia.html">Virginia</a>
                        <a href="states/new-york.html">New York</a>
                        <a href="states/north-carolina.html">North Carolina</a>
                        <a href="states/rhode-island.html">Rhode Island</a>
                    </div>
                </li>
                <li><a href="history.html">History</a></li>
                <li><a href="conclusion.html">Conclusion</a></li>
                <li><a href="feedback.html" class="active">Feedback</a></li>
            </ul>
        </div>
    </nav>

    <!-- Main Content Section -->
    <section class="content">
        <div class="container">
            <h2>Value Your Feedback</h2>
            <p>Thank you for exploring the rich history of the first thirteen American states. I would love to hear your thoughts, suggestions, and experiences related to this project.</p>
            
            <h3>Leave Your Feedback:</h3>
            <form action="submit_feedback.php" method="POST" class="feedback-form" id="feedbackForm">
                <div class="form-group">
                    <label for="name"><i class="fas fa-user"></i> Name (optional):</label>
                    <input type="text" id="name" name="name" placeholder="Your name">
                </div>
                <div class="form-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email (optional):</label>
                    <input type="email" id="email" name="email" placeholder="Your email">
                </div>
                <div class="form-group">
                    <label for="feedback"><i class="fas fa-comments"></i> Your Feedback:</label>
                    <textarea id="feedback" name="feedback" rows="5" placeholder="Write your feedback here..." required></textarea>
                </div>
                <button type="submit" class="submit-button"><i class="fas fa-paper-plane"></i> Submit Feedback</button>
            </form>

            <h3>Previous Feedback:</h3>
            <div id="previous-feedback" class="previous-feedback">
                <!-- Відгуки будуть завантажені тут через PHP -->
                <?php
                    // Відображення коментарів з файлу feedback.txt
                    $feedback_file = 'feedback.txt';
                    if(file_exists($feedback_file)){
                        $comments = file($feedback_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                        foreach($comments as $comment){
                            $parts = explode('|', $comment);
                            $name = htmlspecialchars($parts[0]);
                            $email = htmlspecialchars($parts[1]);
                            $msg = htmlspecialchars($parts[2]);
                            echo "<div class='comment'>";
                            if($name){
                                echo "<p><strong>$name</strong></p>";
                            }
                            if($email){
                                echo "<p><em>$email</em></p>";
                            }
                            echo "<p>$msg</p>";
                            echo "</div>";
                        }
                    } else {
                        echo "<p>No feedback yet. Be the first to leave a comment!</p>";
                    }
                ?>
            </div>
        </div>
    </section>

    <!-- Footer Section -->
    <footer>
        <div class="container">
            <p>&copy; 2024 The First 13 American States. All Rights Reserved.</p>
        </div>
    </footer>
    <script src="script_feedback.js"></script>
</body>
</html>
