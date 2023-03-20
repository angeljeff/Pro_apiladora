<?php

include("../conexion/conexion.php");
include("../funciones_generales.php");
include("../models/ModCorreo.php");
include("../models/ModUsuarios.php");



$opcion=$_POST['opcion'];

switch($opcion){
    // verifica que el correo electronico se encuentra en la base de datos 
    case "comprobar":
        $correo= strtolower($_POST['correo']);
        $consulta = "SELECT * FROM usuarios where `correo_electronico`='$correo'";
        $consultarcliente = $conexion->prepare($consulta);
        $consultarcliente->execute();
        $count= $consultarcliente->rowCount();
        


        // llamo al archivo de funciones generales 
        $funciones= new Funciones_generales;
        $codigo= $funciones->crear_codigo();

        // declaro un objeto para enviar codigo al correo 
        $enviar_correo= new Correo;
        if($count >0) {
            $cliente=$consultarcliente->fetchAll();
            if(($cliente[0]['cedula']!=null && $cliente[0]['cedula']!="") && ($cliente[0]['apellidos']!=null && $cliente[0]['apellidos']!="")){echo"ocupado";}
            else{
                $actualizar= $conexion->prepare("UPDATE usuarios SET  `codigo`='$codigo' WHERE `correo_electronico`='$correo'");
                $actualizar->execute(); 
                $enviar_correo->enviar_codigo_registro($correo,$codigo);
                $arreglo[]=[$correo,$codigo];
                echo json_encode($arreglo);
            }
        }else{
            $insertar= $conexion->prepare("INSERT INTO usuarios (correo_electronico, codigo) VALUES (:correo, :codigo)");
            $insertar->bindParam(':correo',$correo);
            $insertar->bindParam(':codigo',$codigo);
            $insertar->execute();
            $enviar_correo->enviar_codigo_registro($correo,$codigo);
            $arreglo[]=[$correo,$codigo];
            echo json_encode($arreglo);

        }


    break;

    // registra al cliente actualizando todos los campos a excepcion del codigo y el correo
    case "registrar":
        $cliente= new Usuarios();
        $cliente->nombres=$_POST['nombres'];
        $cliente->apellidos=$_POST['apellidos'];
        $cliente->cedula=$_POST['cedula'];
        $cliente->celular=$_POST['celular'];
        $cliente->correo_e= strtolower($_POST['correo']);
        $cliente->contrasenia=hash("SHA256",$_POST['contrasenia']);
        $cliente->codigo=$_POST['codigo'];
        $valida= $cliente->registrar_clienteCompleto($cliente);
        if($valida){echo"si";}
        else{echo "no";}
        
    break;

    case "comprobar_cedula":
        $cliente= new Usuarios();
        $cliente->cedula=$_POST['cedula'];
        $valida= $cliente->comprobar_ced_registrada($cliente);
        if($valida){echo"si";}
        else{echo "no";}
        
    break;


        



};

?>


