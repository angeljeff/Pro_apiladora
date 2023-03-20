<?php

// include("../conexion/conexion.php");
// include("../funciones_generales.php");
// include("../models/ModCorreo.php");
include("../models/ModUsuarios.php");



$opcion=$_POST['opcion'];

switch($opcion){
    case "obtenerClientes":
        $cliente= new Usuarios();
        $arrResponse=$cliente->getUsuarios(RolCliente) ;
        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        // $valor= array("nombres"=>"jefferson angel","apellidos"=>"jefferson angel","correo_electronico"=>"jefferson angel");
        // echo json_encode($valor,JSON_UNESCAPED_UNICODE);
    break;


    case "consultarCorreoContra":
        $cliente= new Usuarios();
        $cliente->correo_e= strtolower($_POST['correo']);
        $cliente->cedula= $_POST['cedula'];
        $Response=$cliente->consultarCoreoCedula($cliente) ;
        if($Response){
            $arrResponse=array("correoycedula"=>"si","solocorreo"=>"no", "solocedula"=>"no" );

        }else{
            $Response=$cliente->comprobar_ced_registrada($cliente) ;
            if($Response){
                $arrResponse=array("correoycedula"=>"no","solocorreo"=>"no", "solocedula"=>"si" );
    
            }else{
                $Response=$cliente->comprobar_email_registrado($cliente) ;
                if($Response){
                    $arrResponse=array("correoycedula"=>"no","solocorreo"=>"si", "solocedula"=>"no" );
        
                }else{
                    $arrResponse=array("correoycedula"=>"no","solocorreo"=>"no", "solocedula"=>"no" );
                      
                }
            }

        }
        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        // $valor= array("nombres"=>"jefferson angel","apellidos"=>"jefferson angel","correo_electronico"=>"jefferson angel");
        // echo json_encode($valor,JSON_UNESCAPED_UNICODE);
    break;


    case "registrarclienteAdmin":
        $cliente= new Usuarios();
        $cliente->cedula=$_POST['txtIdentificacion'];
        $cliente->correo_e= strtolower($_POST['txtEmail']);
        $cliente->nombres=$_POST['txtNombre'];
        $cliente->apellidos=$_POST['txtApellido'];
        $cliente->celular=$_POST['txtTelefono'];
        $cliente->contrasenia= hash("SHA256",$_POST['txtIdentificacion']);
        $cliente->rol= RolCliente;
        $Response=$cliente->comprobar_email($cliente) ;
        if($Response){
            $Response=$cliente->registrar_usuarioCom($cliente);
            if($Response){
                $arrResponse=array("respon"=>"si");
            }    
        }else{
            $Response=$cliente->registrar_usuarioC($cliente);
            if($Response){
                $arrResponse=array("respon"=>"si");
            }

        }
        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        // $valor= array("nombres"=>"jefferson angel","apellidos"=>"jefferson angel","correo_electronico"=>"jefferson angel");
        // echo json_encode($valor,JSON_UNESCAPED_UNICODE);
    break;

    



        



};

?>