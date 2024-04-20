<?php
function data()
{
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "forum";


    $conn = new mysqli($servername, $username, $password, $dbname);


    if ($conn->connect_error) {
        die("Ошибка подключения: " . $conn->connect_error);
    }
    echo "Подключение успешно";
    return $conn;
}
?>