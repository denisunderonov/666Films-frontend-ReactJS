<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (empty($_POST)) {
        echo "Данные POST-запроса отсутствуют";
    } else {
        $conn = require_once('./data.php');

        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = $_POST["password"];


        $sql = "INSERT INTO users (имя, почта, пароль ) VALUES ('$name', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            echo "Данные успешно добавлены в базу данных.";
        } else {
            echo "Ошибка: " . $sql . "<br>" . $conn->error;
        }
    }
} else {
    echo "Это не POST-запрос";
}
?>;