<?php

include("../models/ModUsuarios.php");
include("../models/ModCorreo.php");
include("../funciones_generales.php");

$opcion=$_POST['opcion'];

switch($opcion){

    case "obtenerdatos":
        $cliente= new Usuarios();
        $cliente->cedula=$_POST['cedula'];
        $valida= $cliente->obtener_usuario($cliente);
        $data= array("data"=>$valida, "verificar"=>"false" );
        echo json_encode($data,JSON_UNESCAPED_UNICODE);

        
    break;

    case "correoAContrasenia":
        $correo= new Correo();
        $funcion = new Funciones_generales();
        $codigo = $funcion->crear_codigo();
        $correo_elec=$_POST['correo']; 
        $valida= $correo->enviar_actualizar_datos($codigo, $correo_elec);
        if($valida){
            $respuesta= array("respon" =>"si", "codigo"=>$codigo);
        }
        else{$respuesta= array("respon" =>"no", "error"=>$valida);}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;

    case "ModificarPerfil":
        $cliente= new Usuarios();
        $cliente->cedula=$_POST['cedula'];
        $cliente->correo_e=$_POST['txtEmail'];
        $cliente->nombres=$_POST['txtNombre'];
        $cliente->apellidos=$_POST['txtApellido'];
        $cliente->celular=$_POST['txtTelefono'];
        $cliente->contrasenia=$_POST['txtPassword'];
        $valida= $cliente->actualizar_datos($cliente);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;

    

    


        



};

?>


