<?php
class Navegacion{

    public $seleccionNav;
    public $fondoNav;
    public $NavFixed;
    public $cedulauser;

    public function __construct(){
        $this-> seleccionNav="bg-gradient-primary";
        $this-> fondoNav="bg-gradient-dark";
        $this-> NavFixed=0;
        $this-> cedulauser="";


    }
    

    public function registrar_navegacion($iduser){
        include("../conexion/conexion.php");
        $insertar= $conexion->prepare("INSERT INTO personalizacion (selectionNav, fondoNav, id_usuario)
         VALUES (:selection, :fondo, :iduser)");
        $insertar->bindParam(':selection',$this->seleccionNav);
        $insertar->bindParam(':fondo',$this->fondoNav);
        $insertar->bindParam(':iduser',$iduser);
        if($insertar->execute()){
            return true;
        }else{
            return false ;
        }   
        die();
    }

    public function getPersonalizacion($cedulauser){
        require_once("../../conexion/conexion.php");
        $this->cedulauser= $cedulauser;
        $consulta = "SELECT idpersonalizacion, 
                            selectionNav,
                            fondoNav,
                            Navfixed
         FROM personalizacion where `id_usuario`=$this->cedulauser limit 1";
        $consultarpersonalizacion = $conexion->prepare($consulta);
        $consultarpersonalizacion->execute();
        $count= $consultarpersonalizacion->rowCount();
        if($count>0){
            return $consultarpersonalizacion->fetch(PDO::FETCH_ASSOC);

           }
        die(); 
    }

    
    public function actualizarPersonalizacion($cedula, $nav, $fondo, $fijo){
        $this->seleccionNav=$nav ;
        $this->fondoNav=$fondo;
        $this->NavFixed= $fijo;
        $this->cedulauser= $cedula;

        require_once("../../conexion/conexion.php");
        $actualizar= $conexion->prepare("UPDATE personalizacion SET  selectionNav=:nav, 
                                        fondoNav=:fondo, 
                                        Navfixed=:fijo
                                        WHERE
                                         id_usuario=$this->cedulauser ");
        $actualizar->bindParam(':nav',$this->seleccionNav);
        $actualizar->bindParam(':fondo',$this->fondoNav);
        $actualizar->bindParam(':fijo',$this->NavFixed);
        if($actualizar->execute()){
            return true;}
        else{return false;}
    die();
    }

    


};



?>