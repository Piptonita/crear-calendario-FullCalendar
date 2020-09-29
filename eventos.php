<?php
    header('Content-Type: application/json');

    $pdo = new PDO("mysql:dbname=calendar;host=localhost;", "guillermo", "guillermo");
    $opcion = (isset($_GET['accion'])) ?$_GET['accion'] : 'leer';
    
    if($_POST){
        if($_POST['horaInicio'] != ''){
            $fechaInicio = $_POST['fechaInicio'] . 'T' . $_POST['horaInicio'];
        }else{
            $fechaInicio = $_POST['fechaInicio'];
        }
        
        if($_POST['horaFin'] != ''){
            $fechaFin = $_POST['fechaFin'] . 'T' . $_POST['horaFin'];
        }else{
            $fechaFin = $_POST['fechaFin'];
        }
    }


    switch($opcion){
        case 'crear':
            $sentenciaSQL = $pdo->prepare("INSERT INTO events(title,start,end,description,color,textColor) VALUES(:title, :start, :end, :description, :color, :textColor );");
            $respuesta = $sentenciaSQL->execute(array(
                "title" => $_POST['titulo'],
                "start" => $fechaInicio, // aqui y en end ponemos las fechas filtradas
                "end" => $fechaFin,
                "description" => $_POST['descripcion'],
                "color" => $_POST['color'],
                "textColor" => $_POST['textColor']
            ));
            echo json_encode($resultado);
            break;
        case 'borrar': // creamos una nueva acción
            // realizamos la consulta y la ejecutamos.
            $sentenciaSQL = $pdo->prepare("DELETE FROM events WHERE id=:id;");
            $respuesta = $sentenciaSQL->execute(array(
                "id" => $_POST['id']
            ));
            echo json_encode($respuesta);
            break;
        default: 
            $sentenciaSQL = $pdo->prepare("SELECT * FROM events");
            $sentenciaSQL->execute();
            $resultado= $sentenciaSQL->fetchALL(PDO::FETCH_ASSOC);
            echo json_encode($resultado);
        }

?>