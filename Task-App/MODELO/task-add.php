<?php

require 'database.php'; //instanciar la base de datos

if(isset($_POST['name'])){ //verifica que se haya enviado un nombre en desde el formulario
    $name = $_POST['name']; //obtiene el nombre y lo guarda en una variable
    $description = $_POST['description']; //obtiene la descripcion y lo guarda en una variable
    $query = "INSERT INTO task (name, description) VALUES ('$name', '$description')"; //crea variable con la consulta para agregar la tarea
    $result = mysqli_query($connection, $query); //ejecuta la consulta y almacena resultado en $result
    if(!$result){ //busca errores en la consulta
        die('Query Error' . mysqli_error($connection)); //devuelve el error si lo hay 
    }else{
        echo "la tarea es: (" . $name . ") se ah insertado correctamente"; //devuelve mensaje de exito si no hay errores
    }
    
}
?>