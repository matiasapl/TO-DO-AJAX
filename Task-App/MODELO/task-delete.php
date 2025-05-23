<?php
require 'database.php'; //instancia base de datos
if(isset($_POST['id'])) {  //verifica que se aya enviado el id desde js
    
$id = $_POST['id']; //obtiene el id y lo guarda en una variable
$query = "DELETE FROM task WHERE id = $id"; //crea variable con la consulta para eliminar la tarea
$result = mysqli_query($connection, $query); //ejecuta la consulta y almacena resultado en $result

if(!$result){ //busca errores en la consulta
    die('Query Failed: ' . mysqli_error($connection)); //devuelve el error si lo hay
    }else{
    echo "tarea eliminada satisfactoriamente"; //devuelve mensaje de exito si no hay errores
    }


} 

?>