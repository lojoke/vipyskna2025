<?php
// submit_feedback.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $feedback = isset($_POST['feedback']) ? trim($_POST['feedback']) : '';

    if ($feedback === '') {
        echo "error";
        exit;
    }

    // Очищення даних для безпеки
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $feedback = htmlspecialchars($feedback, ENT_QUOTES, 'UTF-8');

    // Перевірка валідності електронної пошти
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error";
        exit;
    }

    $entry = "$name|$email|$feedback\n";
    $file = 'feedback.txt';

    if(!file_exists($file)){
        // Спроба створити файл
        if(!touch($file)){
            echo "error";
            exit;
        }
    }

    if(!is_writable($file)){
        echo "error";
        exit;
    }

    // Запис даних у файл з блокуванням
    if(file_put_contents($file, $entry, FILE_APPEND | LOCK_EX)){
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "error";
}
?>
