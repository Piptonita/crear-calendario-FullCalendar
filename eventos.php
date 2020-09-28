<?php
    // vamos a establecer que este archivo muestre los datos como un JSON:
    header('Content-Type: application/json');
    // ahora conectamos con la base de datos:
    $pdo = new PDO("mysql:dbname=calendar;host=localhost;", "guillermo", "guillermo");
    // preparamos la consulta:
    $sentenciaSQL = $pdo->prepare("SELECT * FROM events");
    // la ejecutamos:
    $sentenciaSQL->execute();
    // guardamos el resultado en una variable:
    $resultado= $sentenciaSQL->fetchALL(PDO::FETCH_ASSOC);
    // y lo codificamos en JSON a la vez que lo imprmimos:
    echo json_encode($resultado);
?>