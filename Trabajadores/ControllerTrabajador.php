<?php

// include("../conexion/conexion.php");
// include("../funciones_generales.php");
// include("../models/ModCorreo.php");
include("../models/ModUsuarios.php");



$opcion=$_POST['opcion'];

switch($opcion){
    case "obtenerTrabajadores":
        $trabajador= new Usuarios();
        $arrResponse=$trabajador->getUsuarios(RolTrabajador) ;
        for ($i=0; $i < count($arrResponse); $i++) {
            $btnEdit = '';
            $check= '';
            $arrResponse[$i]['estado']= ($arrResponse[$i]['estado_t']== 0)? '<span class="badge bg-danger">Inactivo</span>' : '<span class="badge bg-info">Activo</span>' ;
            $btnEdit = '<button  class="btn btn-info  btn-sm" onClick="Editarinfo(this,'.$arrResponse[$i]['id_usuario'].')" title="Editar Trabajador"><i style="font-size:10px;" class="fas fa-pencil-alt"></i></button>';
            $check= ($arrResponse[$i]['estado_t']== 0)? '<div class="form-check form-switch"><input class="form-check-input" type="checkbox" onchange="CambioEstado(this, '.$arrResponse[$i]['id_usuario'].')"></div>':
                '<div class="form-check form-switch"><input checked class="form-check-input" type="checkbox" onchange="CambioEstado(this, '.$arrResponse[$i]['id_usuario'].')"></div>';
            $arrResponse[$i]['options'] = '<div class="text-center  d-flex justify-content-around">'.$btnEdit.$check.'</div>';
        }
        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        // $valor= array("nombres"=>"jefferson angel","apellidos"=>"jefferson angel","correo_electronico"=>"jefferson angel");
        // echo json_encode($valor,JSON_UNESCAPED_UNICODE);
    break;


    case "registrarTrabajadorAdmin":
        $trabajador= new Usuarios();
        $trabajador->cedula=$_POST['txtIdentificacion'];
        $trabajador->correo_e= strtolower($_POST['txtEmail']);
        $trabajador->nombres=$_POST['txtNombre'];
        $trabajador->apellidos=$_POST['txtApellido'];
        $trabajador->celular=$_POST['txtTelefono'];
        $trabajador->contrasenia= hash("SHA256",$_POST['txtIdentificacion']);
        $trabajador->rol= RolTrabajador;
        $Response=$trabajador->comprobar_email($trabajador) ;
        if($Response){
            $Response=$trabajador->registrar_usuarioCom($trabajador);
            if($Response){
                $arrResponse=array("respon"=>"si");
            }    
        }else{
            $Response=$trabajador->registrar_usuarioC($trabajador);
            if($Response){
                $arrResponse=array("respon"=>"si");
            }

        }
        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);

    break;


    case "obtengoUnTrabajador":
        $trabajador= new Usuarios();
        $id= $_POST['idTrabajador'];
        $cedula= $_POST['cedula'];
        $respuesta = $trabajador->getUnUsuario($id, $cedula);
        $data= array("data"=> $respuesta);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
 
    break;

    
    case "actualizarTrabajador":
        $usuario= new Usuarios();
        $usuario->id=$_POST['idTrabajador'];
        $usuario->cedula =  $_POST['cedula'];
        $usuario->celular = $_POST['txtTelefono'];
        $usuario->correo_e = strtolower($_POST['txtEmail']);
        $usuario->nombres = $_POST['txtNombre'];
        $usuario->apellidos = $_POST['txtApellido'];
        $valida= $usuario->actualizar_Usuario($usuario);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;

    case "cambirEstado":
        $usuario= new Usuarios();
        $usuario->id= $_POST['idTrabajador'];
        $usuario->estado = $_POST['estado'];
        $valida= $usuario->actualizar_Estado($usuario);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;



};

?>