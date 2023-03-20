<?php
class Actividad{

    public $idactividad;
    public $nombreA;
    public $descActividad;
    public $ordenA;

    public function __construct(){
        $this->idactividad="";
        $this->nombreA="";
        $this->descActividad="";
        $this->ordenA="";
    }
    

    public function getActividades(){
        require_once("../conexion/conexion.php");
        $consulta = "SELECT *
         FROM actividades order by orden_act asc";
        $consultaractividades = $conexion->prepare($consulta);
        $consultaractividades->execute();
        return $consultaractividades->fetchall(PDO::FETCH_ASSOC);
        die(); 
    }

    public function getUnaActividad($id){
        require_once("../conexion/conexion.php");
        $this->idactividad = $id;
        $consulta = "SELECT *
         FROM actividades where `id_actividad` = '$this->idactividad' ";
        $consultaractividades = $conexion->prepare($consulta);
        $consultaractividades->execute();
        return $consultaractividades->fetch(PDO::FETCH_ASSOC);
        die(); 
    }


    public function guardarActividad( $actividad){
        $this->nombreA= $actividad->nombreA;
        $this->descActividad= $actividad->descActividad;
        require_once("../conexion/conexion.php");
        $consulta = "INSERT INTO actividades (nom_actividad, desc_actividad)
        values (:nom, :descr)";
        $insertar= $conexion->prepare($consulta);
         $insertar->bindParam(':nom',$this->nombreA);
        $insertar->bindParam(':descr',$this->descActividad);
        if($insertar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }


    public function actualizar_Actividad( $actividad){
        $this->idactividad= $actividad->idactividad;
        $this->nombreA= $actividad->nombreA;
        $this->descActividad=  $actividad->descActividad;
        require_once("../conexion/conexion.php");
        $consulta = "UPDATE  actividades SET  `nom_actividad`= :nom , 
        `desc_actividad`= :descr
        where `id_actividad`= '$this->idactividad' ";
        $actualizar= $conexion->prepare($consulta);
        $actualizar->bindParam(':nom',$this->nombreA);
        $actualizar->bindParam(':descr',$this->descActividad);
        if($actualizar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }

    public function actuActividad( $id, $orden){
        $this->idactividad= $id;
        $this->ordenA= $orden;
        include("../conexion/conexion.php");
        $consulta = "UPDATE  actividades SET  `orden_act`= :nom 
        where `id_actividad`= '$this->idactividad' ";
        $actualizar= $conexion->prepare($consulta);
        $actualizar->bindParam(':nom',$this->ordenA);
        if($actualizar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }


    



};



?>