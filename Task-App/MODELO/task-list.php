<?php
    require 'database.php'; //instanciar la base de datos
    $query = "SELECT * FROM task"; //crea variable con la consulta para llamar todas las tareas
    $result = mysqli_query($connection, $query); //ejecuta la consulta y almacena resultado en $result
    if(!$result){  //busca errores en la consulta
        die('Query Error' . mysqli_error($connection));  //devuelve el error si lo hay
    }
    $json = array(); //crea un array vacio para almacenar los resultados
    while($row = mysqli_fetch_array($result)){ //recorre el resultado de la consulta
    $json[] = array( //almacena los resultados en el array
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['ID']
    );
    
    }    
    $jsonstring = json_encode($json); //convierte el array en un string json
    echo $jsonstring; //devuelve el string json
?>