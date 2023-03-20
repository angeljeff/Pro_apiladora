<?php

require_once('../constantes.php');
class Usuarios {

    public $id;
    public $nombres;
    public $apellidos;
    public $cedula;
    public $celular;
    public $correo_e;
    public $contrasenia;
    public $codigo;
    public $rol;
    public $estado;
    public function __construct(){
        $this-> id= 0;
        $this-> nombres=" ";
        $this-> apellidos="";
        $this-> cedula="";
        $this-> celular="";
        $this-> correo_e="";
        $this-> contrasenia="";
        $this-> codigo="";
        $this-> rol="";
        $this-> estado= 1;
    }
    

    public function registrar_clienteCompleto($cliente){
        include("../conexion/conexion.php");
        $insertar= $conexion->prepare("UPDATE usuarios SET  cedula=:ced, nombres=:nom, apellidos=:ape, celular=:cel, contrasenia=:contra WHERE `correo_electronico`='$cliente->correo_e' and codigo='$cliente->codigo' ");
        $insertar->bindParam(':ced',$cliente->cedula);
        $insertar->bindParam(':nom',$cliente->nombres);
        $insertar->bindParam(':ape',$cliente->apellidos);
        $insertar->bindParam(':cel',$cliente->celular);
        $insertar->bindParam(':contra',$cliente->contrasenia);
        if($insertar->execute()){
            require_once("ModNavegacion.php");
            $personaliza= new Navegacion();
            $vsl= $personaliza->registrar_navegacion($cliente->cedula);
            if($vsl){
                return true;
            }else{
                return false;
            }
        }
        else{return false;}
    die();
    }

    public function registrar_usuarioCom($cliente){
        include("../conexion/conexion.php");
        $insertar= $conexion->prepare("UPDATE usuarios SET  cedula=:ced, nombres=:nom, apellidos=:ape, celular=:cel, contrasenia=:contra, idrol=:rol WHERE `correo_electronico`='$cliente->correo_e' ");
        $insertar->bindParam(':ced',$cliente->cedula);
        $insertar->bindParam(':nom',$cliente->nombres);
        $insertar->bindParam(':ape',$cliente->apellidos);
        $insertar->bindParam(':cel',$cliente->celular);
        $insertar->bindParam(':contra',$cliente->contrasenia);
        $insertar->bindParam(':rol',$cliente->rol);
        if($insertar->execute()){
            require_once("ModNavegacion.php");
            $personaliza= new Navegacion();
            $vsl= $personaliza->registrar_navegacion($cliente->cedula);
            if($vsl){
                return true;
            }else{
                return false;
            }
        }
        else{return false;}
    die();
    }








    public function registrar_usuarioC($cliente){
        include("../conexion/conexion.php");
        $insertar= $conexion->prepare("INSERT INTO usuarios (cedula, nombres, apellidos, celular, contrasenia, correo_electronico, idrol) 
        values(:ced, :nom, :ape, :cel, :contra , :cor , :rol)  ");
        $insertar->bindParam(':ced',$cliente->cedula);
        $insertar->bindParam(':nom',$cliente->nombres);
        $insertar->bindParam(':ape',$cliente->apellidos);
        $insertar->bindParam(':cel',$cliente->celular);
        $insertar->bindParam(':contra',$cliente->contrasenia);
        $insertar->bindParam(':cor',$cliente->correo_e);
        $insertar->bindParam(':rol',$cliente->rol);
        if($insertar->execute()){
            require_once("ModNavegacion.php");
            $personaliza= new Navegacion();
            $vsl= $personaliza->registrar_navegacion($cliente->cedula);
            if($vsl){
                return true;
            }else{
                return false;
            }
        }
        else{return false;}
    die();
    }





    public function comprobar_ced_registrada($cliente){ 
        include("../conexion/conexion.php");
        $consulta = "SELECT * FROM usuarios where `cedula`='$cliente->cedula'";
        $consultarcliente = $conexion->prepare($consulta);
        $consultarcliente->execute();
        $count= $consultarcliente->rowCount();
        if($count>0){
            return true;}
        else{return false;}
    
        die();
    } 

    public function obtener_usuario($cliente){ 
        include("../conexion/conexion.php");
        $consulta = "SELECT id_usuario, nombres, apellidos, celular, correo_electronico, cedula FROM usuarios where `cedula`='$cliente->cedula'";
        $consultarcliente = $conexion->prepare($consulta);
        $consultarcliente->execute();
        $count= $consultarcliente->rowCount();
        if($count>0){
            return $consultarcliente->fetch(PDO::FETCH_ASSOC);}
        else{return false;}
    
        die();
    } 

    public function comprobar_email_registrado($cliente){ 
        include("../conexion/conexion.php");
        $consulta = "SELECT * FROM usuarios where `correo_electronico`='$cliente->correo_e' and `cedula`!='' ";
        $consultarcliente = $conexion->prepare($consulta);
        $consultarcliente->execute();
        $count= $consultarcliente->rowCount();
        if($count>0){
            return true;}
        else{return false;}

        die();
    }

    public function comprobar_email($cliente){ 
        include("../conexion/conexion.php");
        $consulta = "SELECT * FROM usuarios where `correo_electronico`='$cliente->correo_e' ";
        $consultarcliente = $conexion->prepare($consulta);
        $consultarcliente->execute();
        $count= $consultarcliente->rowCount();
        if($count>0){
            return true;}
        else{return false;}

        die();
    } 

    public function actualizar_contrasenia($cliente){ 
        include("../conexion/conexion.php");
        $actualizar= $conexion->prepare("UPDATE usuarios SET  `contrasenia`='$cliente->contrasenia' WHERE `correo_electronico`='$cliente->correo_e'");
        if($actualizar->execute()){
            return true;
        }
        die();
    } 


    public function actualizar_datos($cliente){ 
        include("../conexion/conexion.php");
        if($cliente->contrasenia==""){
            $actualizar= $conexion->prepare("UPDATE usuarios SET  `nombres`='$cliente->nombres' , `apellidos`='$cliente->apellidos',
            `celular`='$cliente->celular', `correo_electronico`='$cliente->correo_e'  WHERE `cedula`='$cliente->cedula'");
        }else{
            $cliente->contrasenia= hash("SHA256",$cliente->contrasenia); 
            $actualizar= $conexion->prepare("UPDATE usuarios SET  `nombres`='$cliente->nombres' , `apellidos`='$cliente->apellidos',
            `celular`='$cliente->celular', `correo_electronico`='$cliente->correo_e', `contrasenia`='$cliente->contrasenia'  WHERE `cedula`='$cliente->cedula'");
        }
        if($actualizar->execute()){
            return true;
        }
        die();
    }
    
    public function getUsuarios($rol){
        $this->rol= $rol;
        include("../conexion/conexion.php");
        $consulta = "SELECT cedula,
        CONCAT(nombres,' ',apellidos) as nombres_completos, 
         correo_electronico,
         celular,
         id_usuario, estado_t
          FROM usuarios where cedula != '' and idrol = $this->rol";
        $consultarUser = $conexion->prepare($consulta);
        $consultarUser->execute() ;
        return $consultarUser->fetchall(PDO::FETCH_ASSOC);
            // echo  json_encode($valor,JSON_UNESCAPED_UNICODE);

        die();
    } 


    public function consultarCoreoCedula($cliente){ 
        include("../conexion/conexion.php");
        $consulta = "SELECT * FROM usuarios where `cedula` = '$cliente->cedula'  and `correo_electronico`='$cliente->correo_e'  ";
        $consultarcliente = $conexion->prepare($consulta);
        $consultarcliente->execute() ;
        $count= $consultarcliente->rowCount();
        if($count>0){
            return true;

        }else{
            return false;
        }
        // return $consultarcliente->fetchall(PDO::FETCH_ASSOC);
            // echo  json_encode($valor,JSON_UNESCAPED_UNICODE);

        die();
    }

    public function getUnUsuario($id, $cedula){
        require_once("../conexion/conexion.php");
        $this->id = $id;
        $this->cedula = $cedula;
        $consulta = "SELECT *
         FROM usuarios where `id_usuario` = '$this->id' and `cedula` = '$this->cedula' ";
        $consultarUsuario = $conexion->prepare($consulta);
        $consultarUsuario->execute();
        return $consultarUsuario->fetch(PDO::FETCH_ASSOC);
        die(); 
    }


    public function actualizar_Usuario( $usuario){
        $this->id= $usuario->id;
        $this->nombres= $usuario->nombres;
        $this->apellidos= $usuario->apellidos;
        $this->cedula= $usuario->cedula;
        $this->celular= $usuario->celular;
        $this->correo_e= $usuario->correo_e;
        require_once("../conexion/conexion.php");
        $consulta = "UPDATE  usuarios SET  `nombres`= :nom , 
        `apellidos`= :ape , `celular` =:cel, `correo_electronico` =:cor 
        where `id_usuario`= '$this->id' and `cedula`='$this->cedula' ";
        $actualizar= $conexion->prepare($consulta);
        $actualizar->bindParam(':nom',$this->nombres);
        $actualizar->bindParam(':ape',$this->apellidos);
        $actualizar->bindParam(':cel',$this->celular);
        $actualizar->bindParam(':cor',$this->correo_e);

        if($actualizar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }

    public function actualizar_Estado($usuario){
        $this->id= $usuario->id;
        $this->estado= $usuario->estado;
        require_once("../conexion/conexion.php");
        $consulta = "UPDATE  usuarios SET  `estado_t`= :est
        where `id_usuario`= '$this->id' ";
        $actualizar= $conexion->prepare($consulta);
        $actualizar->bindParam(':est',$this->estado);
        if($actualizar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }

    
    

};


?>