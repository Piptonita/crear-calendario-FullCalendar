<?php
    header('Content-Type: application/json');
    // habilitamos CORS para poder almacenar recursos utilizando promesas:
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    $pdo = new PDO("mysql:dbname=calendar;host=localhost;", "guillermo", "guillermo");
    // recuperamos de la url la opción:
    $opcion = (isset($_GET['accion'])) ?$_GET['accion'] : 'leer';
    
    // vamos a filtrar las fechas que entren de POST:
    if($_POST){
        // preguntamos si no esta vacio para añadir la hora:
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


    // hacemos un switch para comprobar que opción nos ha llegado y devolver lo que sea oportuno:
    switch($opcion){
        case 'crear':
            // preparamos una consulta de inserción
            $sentenciaSQL = $pdo->prepare("INSERT INTO events(title,start,end,description,color,textColor) VALUES(:title, :start, :end, :description, :color, :textColor );");
            // y ahora la ejecutamos pasandole todos los campos que nos llegan por post:
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
        default: // en default vamos a psara la consulta select que teníamos ya que es lo que hará siempre por defecto:
            $sentenciaSQL = $pdo->prepare("SELECT * FROM events");
            $sentenciaSQL->execute();
            $resultado= $sentenciaSQL->fetchALL(PDO::FETCH_ASSOC);
            echo json_encode($resultado);
        }

?>