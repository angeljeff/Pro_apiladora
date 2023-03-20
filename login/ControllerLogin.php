<?php
include("../conexion/conexion.php");
include("../models/ModCorreo.php");
include("../constantes.php");
require_once("../models/ModUsuarios.php");
require_once("../funciones_generales.php");



$opcion=$_POST['opcion'];

switch($opcion){
    // verifico que el correo electronico y la contrasenia coincidan para el ingreso 
    case "ingresar":
        $ruta= "";
        $correcto="no";
        $correo= strtolower($_POST['correo']);
        $contrasenia=hash("SHA256",$_POST['contrasenia']);
        $consulta = "SELECT * FROM usuarios where `correo_electronico`='$correo' and `contrasenia`='$contrasenia'";
        $ingresocliente = $conexion->prepare($consulta);
        $ingresocliente->execute();
        $count= $ingresocliente->rowCount();        

        // declaro un objeto para enviar codigo al correo 
        $enviar_correo= new Correo;
        if($count >0) {
            $usuario=$ingresocliente->fetch();
            session_start();
            $_SESSION['usuario']=array();
            $_SESSION['usuario']['nombres']= $usuario['nombres'];
            $_SESSION['usuario']['cedula']= $usuario['cedula'];
            $_SESSION['usuario']['rol']= $usuario['idrol'];
            if($_SESSION['usuario']['rol']==2){ 
                $ruta= URL."/Dashboard/dashboard.php";
                $correcto="si";
                    // header('Location: http://www.google.com/');
				    //header('Location: http://localhost:8080/Pro_apiladora/Dashboard/dashboard.php');

            
            }
            elseif($_SESSION['usuario']['rol']==1){
                $ruta= URL."/Dashboard/dashboard.php";
                $correcto="si";
            }
            }
            $arrResponse= array('correcto'=> $correcto, 'ruta'=> $ruta );
            echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);



    break;

    case "comprobar_email":
        $cliente= new Usuarios();
        $cliente->correo_e =strtolower($_POST['correo']);
        $valida= $cliente->comprobar_email_registrado($cliente);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
        
    break;


    case "enviar_contrasenia":
        $funcion= new Funciones_generales();
        $correo= new Correo();
        $cliente = new Usuarios();
        $contra= $funcion->passGenerator();
        $email=$_POST['correo'];
        $cliente->correo_e= $email;
        $cliente->contrasenia= hash("SHA256",$contra);
        $valida= $correo->enviar_new_contrasenia($contra, $email);
        if($valida){
            $val=  $cliente->actualizar_contrasenia($cliente);
            if($val)
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no", "error"=>$valida);}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
        
    break;


        

};
?>