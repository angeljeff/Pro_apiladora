<?php

require_once('../constantes.php');
class Citas{

    public $idcita;
    public $fecha_agendada;
    public $hora_inicio;
    public $hora_fin;
    public $cantidad_sacas;
    public $peso_libras;
    public $id_usuario;
    public $estado_cita;

    public function __construct(){
        $this->idcita="";
        $this->fecha_agendada="";
        $this->hora_inicio="";
        $this->hora_fin="";
        $this->cantidad_sacas="";
        $this->peso_libras="";
        $this->id_usuario="";
        $this->estado_cita=Pendiente;
    }
    

    public function getCitasFecha($fechastring){
        require_once("../conexion/conexion.php");
        $consulta = "SELECT *
         FROM citas  where
		`hora_inicio` like '$fechastring%' and 
            status_cita  in (1, 3 )  order by hora_inicio asc";
        $consultar = $conexion->prepare($consulta);
        $consultar->execute();
        return $consultar->fetchall(PDO::FETCH_ASSOC);
        die(); 
    }

    // public function getUnaActividad($id){
    //     require_once("../conexion/conexion.php");
    //     $this->idactividad = $id;
    //     $consulta = "SELECT *
    //      FROM actividades where `id_actividad` = '$this->idactividad' ";
    //     $consultaractividades = $conexion->prepare($consulta);
    //     $consultaractividades->execute();
    //     return $consultaractividades->fetch(PDO::FETCH_ASSOC);
    //     die(); 
    // }


    // public function guardarActividad( $actividad){
    //     $this->nombreA= $actividad->nombreA;
    //     $this->descActividad= $actividad->descActividad;
    //     require_once("../conexion/conexion.php");
    //     $consulta = "INSERT INTO actividades (nom_actividad, desc_actividad)
    //     values (:nom, :descr)";
    //     $insertar= $conexion->prepare($consulta);
    //      $insertar->bindParam(':nom',$this->nombreA);
    //     $insertar->bindParam(':descr',$this->descActividad);
    //     if($insertar->execute()){
    //         return true;
    //     }else{
    //         return false ;
    //     }  

    //     die(); 
    // }


    // public function actualizar_Actividad( $actividad){
    //     $this->idactividad= $actividad->idactividad;
    //     $this->nombreA= $actividad->nombreA;
    //     $this->descActividad=  $actividad->descActividad;
    //     require_once("../conexion/conexion.php");
    //     $consulta = "UPDATE  actividades SET  `nom_actividad`= :nom , 
    //     `desc_actividad`= :descr
    //     where `id_actividad`= '$this->idactividad' ";
    //     $actualizar= $conexion->prepare($consulta);
    //     $actualizar->bindParam(':nom',$this->nombreA);
    //     $actualizar->bindParam(':descr',$this->descActividad);
    //     if($actualizar->execute()){
    //         return true;
    //     }else{
    //         return false ;
    //     }  

    //     die(); 
    // }

    // public function actuActividad( $id, $orden){
    //     $this->idactividad= $id;
    //     $this->ordenA= $orden;
    //     include("../conexion/conexion.php");
    //     $consulta = "UPDATE  actividades SET  `orden_act`= :nom 
    //     where `id_actividad`= '$this->idactividad' ";
    //     $actualizar= $conexion->prepare($consulta);
    //     $actualizar->bindParam(':nom',$this->ordenA);
    //     if($actualizar->execute()){
    //         return true;
    //     }else{
    //         return false ;
    //     }  

    //     die(); 
    // }


    



};



?>