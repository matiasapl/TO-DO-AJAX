<?php
require 'database.php'; //instanciar la base de datos

    $id = $_POST['id']; //obtiene el id y almacena en variable
    $name = $_POST['name']; //obtiene el nombre y almacena en variable
    $description = $_POST['description']; //obtiene la descripcion y almacena en variable
    $query = "UPDATE task SET name='$name', description='$description' WHERE id='$id'"; //crea variable con la consulta para editar la tarea

    $result = mysqli_query($connection, $query); //ejecuta la consulta y almacena resultado en $result
    if(!$result){ //busca errores en la consulta
        die('Query Error' . mysqli_error($connection)); //devuelve el error si lo hay
    }else{
    echo "Task updated successfully"; //devuelve mensaje de exito
    }


?>